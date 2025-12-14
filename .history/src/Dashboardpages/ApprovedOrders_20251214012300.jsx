import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../Hook /useAuth";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hook /useAxiosSecure";

const ApprovedOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: orders = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["approved-orders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/orders/approved");
            return res.data;
        },
    });

    // ===== Modal er jonno state =====
    const [openModal, setOpenModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [stage, setStage] = useState("cutting");
    const [note, setNote] = useState("");
    const [submitting, setSubmitting] = useState(false);
    c

    // ===== Tracking Add korar handler =====
    const handleSubmitTracking = async (e) => {
        e.preventDefault();
        if (!selectedOrder) return;

        try {
            setSubmitting(true);

            await axios.post(
                `http://localhost:8000/orders/${selectedOrder._id}/production-updates`,
                {
                    stage,
                    note,
                    updatedBy: user?.email || "manager@factory.com",
                }
            );

            toast.success("Tracking update added");

            // form reset
            setStage("cutting");
            setNote("");

            // modal bondho
            setOpenModal(false);
            setSelectedOrder(null);

            // abar fresh data ane nibe
            refetch();
        } catch (err) {
            console.error("Failed to add tracking update", err);
            toast.error("Failed to add tracking");
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center text-red-500 text-sm">
                Failed to load approved orders: {error.message}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <Helmet>
                <title>Approved Orders | Manager Panel</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                        Manager Panel
                    </p>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                        Approved Orders
                    </h1>
                    <p className="text-sm text-slate-500">
                        All orders that have been approved and are in production / shipment.
                    </p>
                </div>

                <div className="text-xs px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Total approved: <span className="font-semibold">{orders.length}</span>
                </div>
            </div>

            {/* No orders */}
            {orders.length === 0 ? (
                <div className="min-h-[30vh] flex flex-col items-center justify-center text-slate-500 text-sm">
                    <p>No approved orders yet.</p>
                    <p className="text-xs mt-1">
                        Once you approve orders from{" "}
                        <span className="font-semibold">Pending Orders</span>, they will
                        appear here.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                    <table className="table table-sm">
                        <thead>
                            <tr className="text-xs text-slate-500">
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Buyer</th>
                                <th className="text-right">Qty</th>
                                <th className="text-center">Approved At</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {orders.map((order, idx) => (
                                <tr key={order._id}>
                                    <td>{idx + 1}</td>

                                    <td className="font-mono text-[11px]">
                                        {order._id?.slice(-6) || "—"}
                                    </td>

                                    <td>
                                        <p className="font-medium text-[12px]">
                                            {order.productName || "N/A"}
                                        </p>
                                    </td>

                                    <td>
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-medium">
                                                {order.buyerName || "Unknown"}
                                            </span>
                                            <span className="text-[11px] text-slate-400">
                                                {order.buyerEmail}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="text-right">{order.quantity || 0}</td>

                                    <td className="text-[11px] text-center text-slate-400">
                                        {order.approvedAt
                                            ? new Date(order.approvedAt).toLocaleString()
                                            : order.createdAt
                                                ? new Date(order.createdAt).toLocaleString()
                                                : "—"}
                                    </td>

                                    <td>
                                        <div className="flex justify-end gap-2">
                                            {/* Add Tracking button */}
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setOpenModal(true);
                                                    setStage("cutting");
                                                    setNote("");
                                                }}
                                                className="btn btn-xs btn-primary"
                                            >
                                                Add Tracking
                                            </button>

                                            {/* View / Track button */}
                                            <Link
                                                to={`/dashboard/orders/${order._id}`}
                                                className="btn btn-xs btn-outline"
                                            >
                                                View / Track
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ====== Add Tracking Modal ====== */}
            {openModal && selectedOrder && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box space-y-4">
                        <h3 className="font-bold text-lg">
                            Add Tracking –{" "}
                            <span className="text-blue-600">
                                {selectedOrder.productName || "Order"}
                            </span>
                        </h3>

                        <form onSubmit={handleSubmitTracking} className="space-y-3">
                            {/* Stage dropdown */}
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">Stage</label>
                                <select
                                    className="select select-bordered w-full select-sm"
                                    value={stage}
                                    onChange={(e) => setStage(e.target.value)}
                                >
                                    <option value="cutting">Cutting Completed</option>
                                    <option value="sewing">Sewing Started</option>
                                    <option value="finishing">Finishing</option>
                                    <option value="qc">QC Checked</option>
                                    <option value="packed">Packed</option>
                                    <option value="shipped">Shipped / Out for Delivery</option>
                                </select>
                            </div>

                            {/* Note textarea */}
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">Note</label>
                                <textarea
                                    className="textarea textarea-bordered w-full textarea-sm"
                                    placeholder="Write update note..."
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn btn-primary btn-sm w-full"
                            >
                                {submitting ? "Adding..." : "Add Tracking"}
                            </button>
                        </form>

                        <div className="modal-action">
                            <button
                                className="btn btn-sm"
                                onClick={() => {
                                    setOpenModal(false);
                                    setSelectedOrder(null);
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ApprovedOrders;

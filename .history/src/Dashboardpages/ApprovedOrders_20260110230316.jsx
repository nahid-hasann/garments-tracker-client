import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../Hook /useAuth";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hook /useAxiosSecure";
import { FaTruck, FaEye, FaPlus, FaBox, FaUser, FaClock } from "react-icons/fa";

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

    const [openModal, setOpenModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [stage, setStage] = useState("cutting");
    const [note, setNote] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmitTracking = async (e) => {
        e.preventDefault();
        if (!selectedOrder) return;

        try {
            setSubmitting(true);
            await axiosSecure.post(
                `/orders/${selectedOrder._id}/production-updates`,
                {
                    stage,
                    note,
                    updatedBy: user?.email || "manager@factory.com",
                }
            );

            toast.success("Tracking update added");
            setStage("cutting");
            setNote("");
            setOpenModal(false);
            setSelectedOrder(null);
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
        <div className="space-y-6">
            <Helmet>
                <title>Approved Orders | Manager Panel</title>
            </Helmet>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

                <div className="text-xs px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 w-fit">
                    Total approved: <span className="font-semibold">{orders.length}</span>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="min-h-[30vh] flex flex-col items-center justify-center text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-sm font-medium">No approved orders yet.</p>
                    <p className="text-xs mt-1">
                        Once you approve orders from <span className="font-semibold">Pending Orders</span>, they will appear here.
                    </p>
                </div>
            ) : (
                <>
                    {/* --- Mobile View (Cards) --- */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                        #{order._id?.slice(-6) || "—"}
                                    </span>
                                    <span className="badge badge-sm badge-success text-white">Approved</span>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                        <FaBox className="text-slate-400" /> {order.productName || "N/A"}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                                        <FaUser className="text-slate-400" /> {order.buyerName}
                                    </p>
                                </div>

                                <div className="text-xs text-slate-600 border-t border-slate-100 pt-2 flex justify-between">
                                    <span>Qty: <b>{order.quantity}</b></span>
                                    <span className="flex items-center gap-1 text-slate-400">
                                        <FaClock className="text-[10px]" />
                                        {order.approvedAt ? new Date(order.approvedAt).toLocaleDateString() : "—"}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <button
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setOpenModal(true);
                                            setStage("cutting");
                                            setNote("");
                                        }}
                                        className="btn btn-sm btn-primary w-full"
                                    >
                                        <FaPlus /> Add Tracking
                                    </button>
                                    <Link
                                        to={`/dashboard/orders/${order._id}`}
                                        className="btn btn-sm btn-outline w-full"
                                    >
                                        <FaEye /> View
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- Desktop View (Table) --- */}
                    <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                        <table className="table table-sm w-full">
                            <thead className="bg-slate-50">
                                <tr className="text-xs text-slate-500 uppercase font-bold">
                                    <th className="py-4 pl-4">#</th>
                                    <th>Order ID</th>
                                    <th>Product</th>
                                    <th>Buyer</th>
                                    <th className="text-right">Qty</th>
                                    <th className="text-center">Approved At</th>
                                    <th className="text-right pr-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs divide-y divide-slate-100">
                                {orders.map((order, idx) => (
                                    <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="pl-4 text-slate-400">{idx + 1}</td>
                                        <td className="font-mono text-[11px] text-slate-500">
                                            #{order._id?.slice(-6) || "—"}
                                        </td>
                                        <td>
                                            <p className="font-bold text-slate-700 text-[13px]">
                                                {order.productName || "N/A"}
                                            </p>
                                        </td>
                                        <td>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-700">
                                                    {order.buyerName || "Unknown"}
                                                </span>
                                                <span className="text-[10px] text-slate-400">
                                                    {order.buyerEmail}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-right font-medium text-slate-600">
                                            {order.quantity || 0}
                                        </td>
                                        <td className="text-[11px] text-center text-slate-400">
                                            {order.approvedAt
                                                ? new Date(order.approvedAt).toLocaleDateString() + ' ' + new Date(order.approvedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                : order.createdAt
                                                    ? new Date(order.createdAt).toLocaleDateString()
                                                    : "—"}
                                        </td>
                                        <td className="text-right pr-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedOrder(order);
                                                        setOpenModal(true);
                                                        setStage("cutting");
                                                        setNote("");
                                                    }}
                                                    className="btn btn-xs btn-primary text-white"
                                                    title="Add Tracking Update"
                                                >
                                                    <FaTruck /> Add Tracking
                                                </button>
                                                <Link
                                                    to={`/dashboard/orders/${order._id}`}
                                                    className="btn btn-xs btn-outline hover:bg-slate-100 text-slate-600"
                                                    title="View Details"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* --- Modal (Responsive) --- */}
            {openModal && selectedOrder && (
                <dialog open className="modal modal-bottom sm:modal-middle bg-slate-900/50 backdrop-blur-sm">
                    <div className="modal-box p-6 rounded-t-xl sm:rounded-xl">
                        <h3 className="font-bold text-lg mb-4">
                            Add Tracking – <span className="text-blue-600">{selectedOrder.productName || "Order"}</span>
                        </h3>

                        <form onSubmit={handleSubmitTracking} className="space-y-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Production Stage</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
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

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Update Note</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full h-24"
                                    placeholder="Write a short update note..."
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="modal-action">
                                <button
                                    type="button"
                                    className="btn btn-ghost"
                                    onClick={() => {
                                        setOpenModal(false);
                                        setSelectedOrder(null);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn btn-primary text-white"
                                >
                                    {submitting ? <span className="loading loading-spinner loading-xs"></span> : "Save Update"}
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ApprovedOrders;
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../Hook /useAuth";

const OrderDetails = () => {
    const { id } = useParams();
    const [stage, setStage] = useState("cutting"); // dropdown-এর default value
    const [note, setNote] = useState("");          // textarea এর value
    const [submitting, setSubmitting] = useState(false);
    const { user, role } = useAuth();

    const { data: order, isLoading, error, refetch } = useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/orders/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-2">
                <p className="text-sm text-red-500 font-medium">
                    Could not load order details.
                </p>
                <Link
                    to="/dashboard/all-orders"
                    className="text-xs text-blue-600 hover:text-blue-700"
                >
                    ← Back to all orders
                </Link>
            </div>
        );
    }

    const {
        productName,
        buyerName,
        buyerEmail,
        quantity,
        status,
        createdAt,
    } = order;

    const handleAddUpdate = async (e) => {
        e.preventDefault();
        if (!order) return;

        try {
            setSubmitting(true);

            await axios.post(`http://localhost:8000/orders/${id}/production-updates`, {
                stage,
                note,
                updatedBy: user.email,
            });

            setNote("");
            setStage("cutting");

            refetch();

        } catch (err) {
            console.error("Failed to add production update", err);
        } finally {
            setSubmitting(false);
        }
    };



    return (
        <div className="space-y-4">
            {/* Top bar */}
            <div className="flex items-center justify-between text-xs mb-2">
                <Link
                    to="/dashboard/all-orders"
                    className="text-blue-600 hover:text-blue-700"
                >
                    ← Back to all orders
                </Link>
                <p className="text-slate-400">
                    Order ID: <span className="font-mono">{id}</span>
                </p>
            </div>

            {/* Main card */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 md:p-6 space-y-4">
                <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                        Order Details
                    </p>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                        {productName || "Unknown product"}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Placed by:{" "}
                        <span className="font-medium">
                            {buyerName || "Unknown"} ({buyerEmail})
                        </span>
                    </p>
                </div>

                {/* Basic info grid */}
                <div className="grid sm:grid-cols-3 gap-3 text-sm">
                    <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
                        <p className="text-[11px] text-slate-500">Quantity</p>
                        <p className="font-semibold text-slate-900 mt-0.5">
                            {quantity || 0}
                        </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
                        <p className="text-[11px] text-slate-500">Status</p>
                        <p className="font-semibold mt-0.5 capitalize">
                            {status || "pending"}
                        </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
                        <p className="text-[11px] text-slate-500">Created at</p>
                        <p className="font-mono text-[11px] mt-0.5">
                            {createdAt ? new Date(createdAt).toLocaleString() : "—"}
                        </p>
                    </div>
                </div>

                {/* Simple tracking timeline (UI only for now) */}
                <div className="mt-2">
                    <p className="text-xs font-semibold text-slate-700 mb-2">
                        Tracking timeline (UI only)
                    </p>
                    <ul className="timeline timeline-vertical text-xs">

                        {/* Always show: Order Created */}
                        <li>
                            <div className="timeline-start">Created</div>
                            <div className="timeline-middle">
                                <div className="badge badge-xs"></div>
                            </div>
                            <div className="timeline-end text-slate-600">
                                Order placed by buyer
                            </div>
                        </li>

                        {/* Show Manager Review */}
                        <li>
                            <div className="timeline-start">Manager Review</div>
                            <div className="timeline-middle">
                                <div className="badge badge-xs"></div>
                            </div>
                            <div className="timeline-end text-slate-600">
                                Status: <span className="font-semibold capitalize">{order.status}</span>
                            </div>
                        </li>

                        {/* Show Production updates dynamically */}
                        
                        {order.productionUpdates?.map((u, idx) => (
                            <li key={idx}>
                                <div className="timeline-start capitalize">{u.stage}</div>
                                <div className="timeline-middle">
                                    <div className="badge badge-xs"></div>
                                </div>
                                <div className="timeline-end text-slate-700">
                                    <p className="font-medium">{u.note}</p>
                                    <p className="text-[11px] text-slate-400">
                                        Updated by: {u.updatedBy}
                                    </p>
                                    <p className="text-[11px] text-slate-400">
                                        {new Date(u.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
             
                    {/* PRODUCTION UPDATES HISTORY */}
                    {order.productionUpdates && order.productionUpdates.length > 0 && (
                        <div className="mt-4 bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                            <h2 className="text-sm font-semibold text-slate-800">
                                Production updates
                            </h2>
                            <ul className="space-y-2 text-xs">
                                {order.productionUpdates.map((u, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start justify-between gap-3 border-b last:border-b-0 border-slate-100 pb-2"
                                    >
                                        <div>
                                            <p className="font-semibold capitalize text-slate-800">
                                                {u.stage}
                                            </p>
                                            <p className="text-slate-600">
                                                {u.note}
                                            </p>
                                        </div>
                                        <div className="text-right text-[11px] text-slate-400">
                                            <p>{u.updatedBy || "Unknown"}</p>
                                            <p>
                                                {u.createdAt
                                                    ? new Date(u.createdAt).toLocaleString()
                                                    : ""}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            </div>
            {/* ================= ADD PRODUCTION UPDATE FORM ================= */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <h2 className="text-sm font-semibold text-slate-800">Add Production Update</h2>

                <form onSubmit={handleAddUpdate} className="space-y-3">

                    {/* Stage Dropdown */}
                    <select
                        className="select select-bordered w-full select-sm"
                        value={stage}
                        onChange={(e) => setStage(e.target.value)}
                    >
                        <option value="cutting">Cutting</option>
                        <option value="sewing">Sewing</option>
                        <option value="finishing">Finishing</option>
                        <option value="packing">Packing</option>
                        <option value="shipped">Shipped</option>
                    </select>

                    {/* Note textarea */}
                    <textarea
                        className="textarea textarea-bordered w-full textarea-sm"
                        placeholder="Write update note..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        required
                    />

                    <button disabled={submitting} className="btn btn-primary btn-sm w-full">
                        {submitting ? "Adding..." : "Add Update"}
                    </button>

                </form>
            </div>

        </div>
    );
};

export default OrderDetails;

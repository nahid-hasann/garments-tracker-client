import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const OrderDetails = () => {
    const { id } = useParams();

    const { data: order, isLoading, error } = useQuery({
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
                        <li>
                            <div className="timeline-start">Created</div>
                            <div className="timeline-middle">
                                <div className="badge badge-xs"></div>
                            </div>
                            <div className="timeline-end text-slate-600">
                                Order placed by buyer
                            </div>
                        </li>
                        <li>
                            <div className="timeline-start">Manager review</div>
                            <div className="timeline-middle">
                                <div className="badge badge-xs"></div>
                            </div>
                            <div className="timeline-end text-slate-600">
                                Status: <span className="font-semibold">{status}</span>
                            </div>
                        </li>
                        <li>
                            <div className="timeline-start">Production & shipment</div>
                            <div className="timeline-middle">
                                <div className="badge badge-xs"></div>
                            </div>
                            <div className="timeline-end text-slate-600">
                                Later you can connect this with production tracking table.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;

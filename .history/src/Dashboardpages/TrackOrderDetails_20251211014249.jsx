import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import useAuth from "../Hook /useAuth";
import useAxiosSecure from "../Hook /useAxiosSecure";

const TrackOrderDetails = () => {
    const { orderId } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: order,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["order-track", orderId],
        queryFn: async () => {
            const res = await axi.get(`http://localhost:8000/orders/${orderId}`);
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

    if (isError || !order) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-2">
                <p className="text-sm text-red-500 font-medium">
                    Could not load order tracking info.
                </p>
                <Link
                    to="/dashboard/track-order"
                    className="text-xs text-blue-600 hover:text-blue-700"
                >
                    ← Back to track list
                </Link>
            </div>
        );
    }

   
    if (user && order.buyerEmail && order.buyerEmail !== user.email) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-2">
                <p className="text-sm text-red-500 font-medium">
                    You are not allowed to view this order.
                </p>
                <Link
                    to="/dashboard/track-order"
                    className="text-xs text-blue-600 hover:text-blue-700"
                >
                    ← Back to track list
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
        productionUpdates = [],
    } = order;

    // latest update index (timeline highlight এর জন্য)
    const lastUpdateIndex =
        productionUpdates && productionUpdates.length > 0
            ? productionUpdates.length - 1
            : -1;

    return (
        <div className="space-y-4">
            <Helmet>
                <title>Track Order | {productName || "Order"}</title>
            </Helmet>

            {/* Top bar */}
            <div className="flex items-center justify-between text-xs mb-2">
                <Link
                    to="/dashboard/track-order"
                    className="text-blue-600 hover:text-blue-700"
                >
                    ← Back to Track Orders
                </Link>
                <p className="text-slate-400">
                    Order ID: <span className="font-mono">{orderId}</span>
                </p>
            </div>

            {/* Main card */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 md:p-6 space-y-4">
                {/* Header info */}
                <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                        Order Tracking
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

                {/* Basic summary */}
                <div className="grid sm:grid-cols-3 gap-3 text-sm">
                    <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
                        <p className="text-[11px] text-slate-500">Quantity</p>
                        <p className="font-semibold text-slate-900 mt-0.5">
                            {quantity || 0}
                        </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
                        <p className="text-[11px] text-slate-500">Current status</p>
                        <p className="font-semibold mt-0.5 capitalize">
                            {status || "pending"}
                        </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
                        <p className="text-[11px] text-slate-500">Placed at</p>
                        <p className="font-mono text-[11px] mt-0.5">
                            {createdAt ? new Date(createdAt).toLocaleString() : "—"}
                        </p>
                    </div>
                </div>

                {/* TIMELINE */}
                <div className="mt-2">
                    <p className="text-xs font-semibold text-slate-700 mb-2">
                        Production & Shipping Timeline
                    </p>

                    <ul className="timeline timeline-vertical text-xs">
                        {/* Step 1: Order Created */}
                        <li>
                            <div className="timeline-start">Created</div>
                            <div className="timeline-middle">
                                <div className="badge badge-xs"></div>
                            </div>
                            <div className="timeline-end text-slate-600">
                                <p className="font-medium">Order placed by buyer</p>
                                <p className="text-[11px] text-slate-400">
                                    {createdAt ? new Date(createdAt).toLocaleString() : "—"}
                                </p>
                            </div>
                        </li>

                        {/* Step 2: Manager review / status */}
                        <li>
                            <div className="timeline-start">Manager Review</div>
                            <div className="timeline-middle">
                                <div className="badge badge-xs"></div>
                            </div>
                            <div className="timeline-end text-slate-600">
                                <p className="font-medium">Order status</p>
                                <p className="text-[11px] text-slate-500">
                                    Current status:{" "}
                                    <span className="font-semibold capitalize">{status}</span>
                                </p>
                            </div>
                        </li>

                        {/* Dynamic steps from productionUpdates */}
                        {productionUpdates.map((u, idx) => {
                            const isLatest = idx === lastUpdateIndex;
                            return (
                                <li key={idx}>
                                    <div className="timeline-start capitalize">
                                        {/* Stage label */}
                                        {u.stage === "cutting" && "Cutting Completed"}
                                        {u.stage === "sewing" && "Sewing Started"}
                                        {u.stage === "finishing" && "Finishing"}
                                        {u.stage === "qc" && "QC Checked"}
                                        {u.stage === "packed" && "Packed"}
                                        {u.stage === "shipped" && "Shipped / Out for Delivery"}
                                        {/* fallback */}
                                        {!["cutting", "sewing", "finishing", "qc", "packed", "shipped"].includes(
                                            u.stage
                                        ) && u.stage}
                                    </div>

                                    <div className="timeline-middle">
                                        <div
                                            className={
                                                "badge badge-xs " +
                                                (isLatest ? "badge-primary" : "")
                                            }
                                        ></div>
                                    </div>

                                    <div className="timeline-end text-slate-700">
                                        <p className={"font-medium " + (isLatest ? "text-primary" : "")}>
                                            {u.note}
                                        </p>
                                        <p className="text-[11px] text-slate-400">
                                            Updated by: {u.updatedBy || "Unknown"}
                                        </p>
                                        <p className="text-[11px] text-slate-400">
                                            {u.createdAt
                                                ? new Date(u.createdAt).toLocaleString()
                                                : ""}
                                        </p>
                                        {isLatest && (
                                            <p className="mt-1 text-[11px] text-primary font-semibold">
                                                Latest update
                                            </p>
                                        )}
                                    </div>
                                </li>
                            );
                        })}

                        {/* If no production updates */}
                        {productionUpdates.length === 0 && (
                            <li>
                                <div className="timeline-start">Production</div>
                                <div className="timeline-middle">
                                    <div className="badge badge-xs"></div>
                                </div>
                                <div className="timeline-end text-slate-600">
                                    <p className="font-medium">
                                        No production updates added yet.
                                    </p>
                                    <p className="text-[11px] text-slate-400">
                                        Once manager starts adding tracking (cutting, sewing, etc.),
                                        you will see them here.
                                    </p>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TrackOrderDetails;

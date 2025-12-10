import React from 'react';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from '../Hook /useAuth';
// import useAuth from "../Hook/ useAuth";


const TrackOrder = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState("");

    const {
        data: orders = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["my-orders", user?.email],
        enabled: !!user?.email, // user আসলে তবেই call
        queryFn: async () => {
            const res = await axios.get(
                `http://localhost:8000/orders?email=${user.email}`
            );
            return res.data;
        },
    });


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
                Failed to load orders: {error.message}
            </div>
        );
    }


    const filteredOrders = orders.filter((order) => {
        if (!search) return true;

        const term = search.toLowerCase();
        return (
            (order.productName || "").toLowerCase().includes(term) ||
            (order._id || "").toLowerCase().includes(term)
        );
    });





    return (
        <div className="space-y-4">
            <Helmet>
                <title>Track Order | Dashboard</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
                        Track Your Orders
                    </h1>
                    <p className="text-xs text-slate-500">
                        Search by product name or order ID to see current status.
                    </p>
                </div>

                {/* Search box */}
                <div>
                    <input
                        type="text"
                        placeholder="Search by product name or order ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-64 rounded-full border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                    />
                </div>
            </div>

            {/* If no order */}
            {filteredOrders.length === 0 ? (
                <div className="min-h-[30vh] flex flex-col items-center justify-center text-slate-500 text-sm">
                    <p>No matching orders found.</p>
                    <p className="text-xs mt-1">
                        Try changing your search term or place a new booking.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredOrders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white border border-slate-200 rounded-xl p-3 md:p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                        >
                            {/* Left side: main info */}
                            <div>
                                <p className="text-xs text-slate-400">
                                    Order ID: <span className="font-mono">{order._id}</span>
                                </p>
                                <p className="text-sm md:text-base font-semibold text-slate-900">
                                    {order.productName}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    Quantity:{" "}
                                    <span className="font-medium text-slate-800">
                                        {order.quantity}
                                    </span>
                                </p>
                            </div>

                            {/* Middle: timeline / status */}
                            <div className="text-xs text-slate-500">
                                <p className="mb-1 font-medium">Status</p>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`badge badge-sm ${order.status === "pending"
                                            ? "badge-warning"
                                            : order.status === "approved"
                                                ? "badge-success"
                                                : "badge-ghost"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                                <p className="mt-1 text-[11px] text-slate-400">
                                    Placed at:{" "}
                                    {order.createdAt
                                        ? new Date(order.createdAt).toLocaleString()
                                        : "N/A"}
                                </p>
                            </div>

                            {/* Right side: dummy timeline text (later real tracking) */}
                            <div className="text-[11px] text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                                <p className="font-medium text-slate-800 mb-1">
                                    Tracking (demo info)
                                </p>
                                <p>
                                    Right now status is{" "}
                                    <span className="font-semibold">{order.status}</span>. After
                                    manager approval, this will move to cutting, sewing,
                                    finishing, QC etc.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default TrackOrder;
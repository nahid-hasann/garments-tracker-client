import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAuth from '../Hook /useAuth';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hook /useAxiosSecure';
import { FaSearch, FaBox, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const TrackOrder = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState("");
    const axiosSecure = useAxiosSecure();

    const {
        data: orders = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["track-orders", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/orders?email=${user.email}`
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
        <div className="space-y-6">
            <Helmet>
                <title>Track Order | Dashboard</title>
            </Helmet>

            {/* --- Header Section (Responsive) --- */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                        Track Your Orders
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Search by product name or order ID to see current status.
                    </p>
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-auto">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search order..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered input-sm w-full md:w-72 pl-9 rounded-full focus:outline-none focus:border-blue-500 bg-white"
                    />
                </div>
            </div>

            {/* --- Orders List --- */}
            {filteredOrders.length === 0 ? (
                <div className="min-h-[30vh] flex flex-col items-center justify-center text-slate-500 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="font-medium">No matching orders found.</p>
                    <p className="text-xs mt-1">
                        Try changing your search term or place a new booking.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredOrders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center gap-4"
                        >
                            {/* 1. Product Info */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start md:block">
                                    <p className="text-[10px] text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded inline-block mb-1">
                                        #{order._id?.slice(-6)}
                                    </p>
                                    {/* Mobile Status Badge (Visible only on mobile) */}
                                    <span
                                        className={`md:hidden badge badge-sm capitalize ${order.status === "pending"
                                            ? "badge-warning text-white"
                                            : order.status === "approved"
                                                ? "badge-success text-white"
                                                : "badge-ghost"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                    <FaBox className="text-blue-500 text-xs" />
                                    {order.productName}
                                </h3>
                                <p className="text-xs text-slate-500 mt-1">
                                    Qty: <span className="font-bold text-slate-700">{order.quantity}</span>
                                </p>
                            </div>

                            {/* 2. Status & Date (Hidden status on mobile, visible on desktop) */}
                            <div className="flex flex-row md:flex-col justify-between md:items-center gap-2 md:gap-0 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                                <div className="hidden md:flex flex-col items-center">
                                    <span className="text-[10px] text-slate-400 uppercase mb-1">Status</span>
                                    <span
                                        className={`badge badge-sm capitalize ${order.status === "pending"
                                            ? "badge-warning text-white"
                                            : order.status === "approved"
                                                ? "badge-success text-white"
                                                : "badge-ghost"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>

                                <div className="md:mt-2 md:text-center">
                                    <p className="text-[10px] text-slate-400 uppercase md:hidden">Date</p>
                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                        <FaClock className="text-slate-300" />
                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* 3. Info Box */}
                            <div className="text-xs text-slate-600 bg-blue-50 border border-blue-100 rounded-lg p-3 md:w-1/3">
                                <p className="font-bold text-blue-700 mb-1 flex items-center gap-1">
                                    <FaMapMarkerAlt /> Current Status:
                                </p>
                                <p className="leading-relaxed">
                                    Order is <span className="font-semibold capitalize">{order.status}</span>.
                                    {order.status === "pending"
                                        ? " Waiting for manager approval."
                                        : " Production/Shipping process initiated."}
                                </p>
                            </div>

                            {/* 4. Action Button */}
                            <div className="md:w-auto">
                                <Link
                                    to={`/dashboard/track-order/${order._id}`}
                                    className="btn btn-sm btn-outline w-full md:w-auto border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-slate-600"
                                >
                                    View Timeline
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrackOrder;
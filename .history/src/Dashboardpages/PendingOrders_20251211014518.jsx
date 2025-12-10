import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import useAxiosSecure from '../Hook /useAxiosSecure';

const PendingOrders = () => {

    const axiosSecure = useAxiosSecure();


    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['all-orders'],
        queryFn: async () => {
            const res = await .get('http://localhost:8000/orders/all');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }


    const pendingOrders = orders.filter(order => order.status === "pending");

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:8000/orders/${id}`, {
                status: newStatus,
            });
            // পাশে toast use করো চাইলে
            // toast.success(`Order ${newStatus}`);
            refetch(); // data notun kore load hobe
        } catch (err) {
            console.error("Status update failed", err);
            // toast.error("Failed to update");
        }
    };


    return (
        <div className="space-y-4">
            <Helmet>
                <title>Pending Orders | Manager Panel</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                        Manager Panel
                    </p>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                        Pending Orders
                    </h1>
                    <p className="text-sm text-slate-500">
                        All booking requests that are waiting for approval.
                    </p>
                </div>

                <div className="text-xs px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                    Total pending: <span className="font-semibold">{pendingOrders.length}</span>
                </div>
            </div>

            {/* No pending orders */}
            {pendingOrders.length === 0 ? (
                <div className="min-h-[40vh] flex flex-col items-center justify-center text-center text-slate-500">
                    <p className="text-sm font-medium">No pending orders right now 🎉</p>
                    <p className="text-xs mt-1">
                        New orders will appear here when buyers place bookings.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 rounded-xl border border-base-200 shadow-sm">
                    <table className="table table-sm">
                        <thead>
                            <tr className="text-xs text-base-content/60">
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Buyer</th>
                                <th className="text-right">Qty</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {pendingOrders.map((order, index) => (
                                <tr key={order._id}>
                                    <td>{index + 1}</td>
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
                                    <td className="text-right">
                                        {order.quantity || 0}
                                    </td>
                                    <td>
                                        <span className="badge badge-ghost badge-xs capitalize">
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                to={`/dashboard/orders/${order._id}`}
                                                className="btn btn-xs btn-ghost"
                                            >
                                                View
                                            </Link>

                                            <button
                                                onClick={() => handleUpdateStatus(order._id, "approved")}
                                                className="btn btn-xs btn-success"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(order._id, "rejected")}
                                                className="btn btn-xs btn-error"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

};

export default PendingOrders;
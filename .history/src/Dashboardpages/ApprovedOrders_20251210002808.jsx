import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const ApprovedOrders = () => {
    const {
        data: orders = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["approved-orders"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:8000/orders/approved");
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
                Failed to load approved orders: {error.message}
            </div>
        );
    }

    return (
        <div className="space-y-4">
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
                        Once you approve orders from <span className="font-semibold">Pending Orders</span>,
                        they will appear here.
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
                                <th>Approved At</th>
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

                                    <td className="text-[11px] text-slate-400">
                                        {order.approvedAt
                                            ? new Date(order.approvedAt).toLocaleString()
                                            : order.createdAt
                                                ? new Date(order.createdAt).toLocaleString()
                                                : "—"}
                                    </td>

                                    <td>
                                        <div className="flex justify-end">
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
        </div>
    );
};

export default ApprovedOrders;

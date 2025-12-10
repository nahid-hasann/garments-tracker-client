import React from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from 'react-router-dom';


const AllOrders = () => {

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["all-orders"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:8000/orders/all");
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



    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                        Manager / Admin Panel
                    </p>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                        All Orders
                    </h1>
                    <p className="text-sm text-slate-500">
                        All booking orders from all buyers across the factory.
                    </p>
                </div>

                <div className="text-xs px-3 py-1.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200">
                    Total orders: <span className="font-semibold">{orders.length}</span>
                </div>
            </div>

            {/* No orders */}
            {orders.length === 0 ? (
                <div className="min-h-[40vh] flex flex-col items-center justify-center text-center text-slate-500">
                    <p className="text-sm font-medium">No orders found</p>
                    <p className="text-xs mt-1">
                        When buyers place bookings, all of them will appear here.
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
                                <th>Created At</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {orders.map((order, index) => (
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

                                    <td className="text-right">{order.quantity || 0}</td>

                                    <td>
                                        <span
                                            className={
                                                "badge badge-xs capitalize " +
                                                (order.status === "approved"
                                                    ? "badge-success"
                                                    : order.status === "rejected"
                                                        ? "badge-error"
                                                        : "badge-ghost")
                                            }
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    <td className="text-[11px] text-slate-400">
                                        {order.createdAt
                                            ? new Date(order.createdAt).toLocaleString()
                                            : "—"}
                                    </td>

                                    <td className="text-right">
                                        <Link
                                            to={`/dashboard/orders/${order._id}`}
                                            className="btn btn-xs btn-ghost"
                                        >
                                            View
                                        </Link>
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

export default AllOrders;
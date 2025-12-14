import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../Hook /useAuth"; 
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios"; 
import useAxiosSecure from "../Hook /useAxiosSecure";

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure(); // ✅ হুক কল করলাম

    const {
        data: orders = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["my-orders", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            
            const res = await axiosSecure.get(`/orders?email=${user.email}`);
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

    const handleCancel = async (id) => {
        const sure = window.confirm("Are you sure you want to cancel this order?");
        if (!sure) return;

        try {
            // Cancel এর জন্যও সিকিউর অ্যাক্সেস দরকার হতে পারে, তাই axiosSecure দিলাম
            await axiosSecure.patch(`/orders/${id}`, {
                status: "cancelled",
            });
            refetch();
        } catch (err) {
            console.error("Failed to cancel order:", err);
        }
    };

    const renderPaymentBadge = (order) => {
        const method = order.paymentMethod;
        const status = order.paymentStatus;
        if (!method) return <span className="badge badge-outline">Not set</span>;
        if (method === "Cash on Delivery") return <span className="badge badge-ghost">Cash on Delivery</span>;
        if (method === "PayFirst") {
            if (status === "paid") return <span className="badge badge-success">Paid (PayFirst)</span>;
            return <span className="badge badge-warning">PayFirst (Unpaid)</span>;
        }
        return <span className="badge badge-outline">{method}</span>;
    };

    return (
        <div className="space-y-4">
            <Helmet>
                <title>My Orders | Dashboard</title>
            </Helmet>
            <div>
                <h1 className="text-xl font-semibold text-slate-900">My Orders</h1>
                <p className="text-xs text-slate-500">All bookings placed from your account.</p>
            </div>

            {orders.length === 0 ? (
                <div className="min-h-[30vh] flex flex-col items-center justify-center text-slate-500 text-sm">
                    <p>No orders found.</p>
                    <p className="text-xs mt-1">
                        Go to <span className="font-semibold">All Products</span> and place a booking.
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
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th>Placed At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {orders.map((order, idx) => (
                                <tr key={order._id}>
                                    <td>{idx + 1}</td>
                                    <td className="font-mono text-[11px]">{order._id?.slice(-6) || "—"}</td>
                                    <td className="font-medium">{order.productName}</td>
                                    <td>{order.quantity}</td>
                                    <td>
                                        <span className={`badge badge-xs ${order.status === "pending" ? "badge-warning" : order.status === "approved" ? "badge-success" : order.status === "cancelled" ? "badge-error" : "badge-ghost"}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{renderPaymentBadge(order)}</td>
                                    <td>{order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}</td>
                                    <td className="flex items-center gap-2">
                                        <Link to={`/dashboard/track-order/${order._id}`} className="btn btn-xs btn-outline">Track</Link>
                                        {order.status === "pending" && (
                                            <button onClick={() => handleCancel(order._id)} className="btn btn-xs btn-error">Cancel</button>
                                        )}
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

export default MyOrders;
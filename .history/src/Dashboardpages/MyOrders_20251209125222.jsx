import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../Hook /useAuth';
import axios from 'axios';
import { Link } from "react-router-dom";


const MyOrders = () => {
    const { user } = useAuth();

    const { data: orders = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["my-orders", user?.email],
        enabled: !!user?.email,
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

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-xl font-semibold text-slate-900">
                    My Orders
                </h1>
                <p className="text-xs text-slate-500">
                    All bookings placed from your account.
                </p>
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
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Placed At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {orders.map((order, idx) => (
                                <tr key={order._id}>
                                    <td>{idx + 1}</td>
                                    <td className="font-medium">{order.productName}</td>
                                    <td>{order.quantity}</td>
                                    <td>
                                        <span
                                            className={`badge badge-xs ${order.status === "pending"
                                                ? "badge-warning"
                                                : order.status === "approved"
                                                    ? "badge-success"
                                                    : "badge-ghost"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        {order.createdAt
                                            ? new Date(order.createdAt).toLocaleString()
                                            : "N/A"}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/dashboard/orders/${order._id}`}
                                            className="btn btn-xs btn-outline"
                                        >
                                            Track
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

export default MyOrders;
import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../Hook /useAuth";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hook /useAxiosSecure";
import { FaBox, FaClock, FaMoneyBillWave, FaTrashAlt, FaMapMarkerAlt } from "react-icons/fa";

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

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
        if (!method) return <span className="badge badge-xs badge-outline">Not set</span>;
        if (method === "Cash on Delivery") return <span className="badge badge-xs badge-ghost">COD</span>;
        if (method === "PayFirst") {
            if (status === "paid") return <span className="badge badge-xs badge-success text-white">Paid</span>;
            return <span className="badge badge-xs badge-warning text-white">Unpaid</span>;
        }
        return <span className="badge badge-xs badge-outline">{method}</span>;
    };

    return (
        <div className="space-y-6">
            <Helmet>
                <title>My Orders | Dashboard</title>
            </Helmet>

            <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900">My Orders</h1>
                    <p className="text-xs text-slate-500 mt-1">All bookings placed from your account.</p>
                </div>
                <div className="badge badge-primary badge-outline">Total: {orders.length}</div>
            </div>

            {orders.length === 0 ? (
                <div className="min-h-[30vh] flex flex-col items-center justify-center text-slate-500 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="font-medium">No orders found.</p>
                    <p className="text-xs mt-1">
                        Go to <Link to="/all-products" className="text-blue-600 font-bold hover:underline">Products</Link> and place a booking.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                            <FaBox className="text-slate-400 text-xs" />
                                            {order.productName}
                                        </h3>
                                        <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-1.5 py-0.5 rounded mt-1 inline-block">
                                            #{order._id?.slice(-6)}
                                        </span>
                                    </div>
                                    <span className={`badge badge-sm capitalize ${order.status === "pending" ? "badge-warning text-white" : order.status === "approved" ? "badge-success text-white" : order.status === "cancelled" ? "badge-error text-white" : "badge-ghost"}`}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="text-xs text-slate-600 border-t border-slate-100 pt-2 space-y-1">
                                    <div className="flex justify-between">
                                        <span>Quantity:</span>
                                        <span className="font-bold">{order.quantity}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center gap-1"><FaMoneyBillWave className="text-slate-400" /> Payment:</span>
                                        {renderPaymentBadge(order)}
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="flex items-center gap-1"><FaClock className="text-slate-400" /> Date:</span>
                                        <span>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mt-1">
                                    <Link to={`/dashboard/track-order/${order._id}`} className="btn btn-sm btn-outline w-full">
                                        <FaMapMarkerAlt /> Track
                                    </Link>
                                    {order.status === "pending" ? (
                                        <button onClick={() => handleCancel(order._id)} className="btn btn-sm btn-error text-white w-full">
                                            <FaTrashAlt /> Cancel
                                        </button>
                                    ) : (
                                        <button disabled className="btn btn-sm btn-disabled w-full">
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                        <table className="table table-sm w-full">
                            <thead className="bg-slate-50">
                                <tr className="text-xs text-slate-500 uppercase font-bold">
                                    <th className="py-4 pl-4">#</th>
                                    <th>Order ID</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Status</th>
                                    <th>Payment</th>
                                    <th>Placed At</th>
                                    <th className="text-right pr-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs divide-y divide-slate-100">
                                {orders.map((order, idx) => (
                                    <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="pl-4 text-slate-400">{idx + 1}</td>
                                        <td className="font-mono text-[11px] text-slate-500">{order._id?.slice(-6) || "—"}</td>
                                        <td className="font-bold text-slate-700">{order.productName}</td>
                                        <td className="font-medium">{order.quantity}</td>
                                        <td>
                                            <span className={`badge badge-xs capitalize py-2 px-3 ${order.status === "pending" ? "badge-warning text-white" : order.status === "approved" ? "badge-success text-white" : order.status === "cancelled" ? "badge-error text-white" : "badge-ghost"}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>{renderPaymentBadge(order)}</td>
                                        <td className="text-slate-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</td>
                                        <td className="text-right pr-4">
                                            <div className="flex justify-end items-center gap-2">
                                                <Link to={`/dashboard/track-order/${order._id}`} className="btn btn-xs btn-outline hover:bg-slate-100 text-slate-600">
                                                    Track
                                                </Link>
                                                {order.status === "pending" && (
                                                    <button onClick={() => handleCancel(order._id)} className="btn btn-xs btn-error text-white">
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyOrders;
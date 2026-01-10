import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { FaCheck, FaTimes, FaEye, FaBox, FaUser, FaClock } from "react-icons/fa";
import useAxiosSecure from '../Hook /useAxiosSecure';

const PendingOrders = () => {

    const axiosSecure = useAxiosSecure();

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['all-orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders/all');
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
            await axiosSecure.patch(`/orders/${id}`, {
                status: newStatus,
            });
            refetch();
        } catch (err) {
            console.error("Status update failed", err);
        }
    };

    return (
        <div className="space-y-6">
            <Helmet>
                <title>Pending Orders | Manager Panel</title>
            </Helmet>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

                <div className="text-xs px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 w-fit">
                    Total pending: <span className="font-semibold">{pendingOrders.length}</span>
                </div>
            </div>

            {pendingOrders.length === 0 ? (
                <div className="min-h-[40vh] flex flex-col items-center justify-center text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-sm font-medium">No pending orders right now 🎉</p>
                    <p className="text-xs mt-1">
                        New orders will appear here when buyers place bookings.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {pendingOrders.map((order) => (
                            <div key={order._id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                        #{order._id?.slice(-6) || "—"}
                                    </span>
                                    <span className="badge badge-sm badge-warning text-white capitalize">
                                        {order.status}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                        <FaBox className="text-slate-400" /> {order.productName || "N/A"}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                                        <FaUser className="text-slate-400" /> {order.buyerName}
                                    </p>
                                </div>

                                <div className="text-xs text-slate-600 border-t border-slate-100 pt-2 flex justify-between">
                                    <span>Qty: <b>{order.quantity}</b></span>
                                    <span className="flex items-center gap-1 text-slate-400">
                                        <FaClock className="text-[10px]" />
                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    <Link
                                        to={`/dashboard/orders/${order._id}`}
                                        className="btn btn-sm btn-ghost border-slate-200"
                                    >
                                        <FaEye />
                                    </Link>
                                    <button
                                        onClick={() => handleUpdateStatus(order._id, "approved")}
                                        className="btn btn-sm btn-success text-white"
                                    >
                                        <FaCheck />
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(order._id, "rejected")}
                                        className="btn btn-sm btn-error text-white"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="hidden md:block overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
                        <table className="table table-sm w-full">
                            <thead className="bg-slate-50">
                                <tr className="text-xs text-slate-500 uppercase font-bold">
                                    <th className="py-4 pl-4">#</th>
                                    <th>Order ID</th>
                                    <th>Product</th>
                                    <th>Buyer</th>
                                    <th className="text-right">Qty</th>
                                    <th>Status</th>
                                    <th className="text-right pr-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs divide-y divide-slate-100">
                                {pendingOrders.map((order, index) => (
                                    <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="pl-4 text-slate-400">{index + 1}</td>
                                        <td className="font-mono text-[11px] text-slate-500">
                                            #{order._id?.slice(-6) || "—"}
                                        </td>
                                        <td>
                                            <p className="font-bold text-slate-700 text-[13px]">
                                                {order.productName || "N/A"}
                                            </p>
                                        </td>
                                        <td>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-700">
                                                    {order.buyerName || "Unknown"}
                                                </span>
                                                <span className="text-[10px] text-slate-400">
                                                    {order.buyerEmail}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-right font-medium text-slate-600">
                                            {order.quantity || 0}
                                        </td>
                                        <td>
                                            <span className="badge badge-warning text-white text-xs capitalize">
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="text-right pr-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    to={`/dashboard/orders/${order._id}`}
                                                    className="btn btn-xs btn-ghost hover:bg-slate-100 text-slate-600"
                                                    title="View Details"
                                                >
                                                    View
                                                </Link>
                                                <button
                                                    onClick={() => handleUpdateStatus(order._id, "approved")}
                                                    className="btn btn-xs btn-success text-white"
                                                    title="Approve"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStatus(order._id, "rejected")}
                                                    className="btn btn-xs btn-error text-white"
                                                    title="Reject"
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
                </>
            )}
        </div>
    );
};

export default PendingOrders;
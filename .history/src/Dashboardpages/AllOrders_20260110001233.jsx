import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { FaSearch, FaFilter } from "react-icons/fa";
import useAxiosSecure from '../Hook /useAxiosSecure';

const AllOrders = () => {
   
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["all-orders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/orders/all");
            return res.data;
        },
    });

    
    const filteredOrders = orders.filter(order => {
       
        const statusMatch = filterStatus === "all" || order.status === filterStatus;

       
        const searchLower = searchTerm.toLowerCase();
        const searchMatch =
            (order.buyerName && order.buyerName.toLowerCase().includes(searchLower)) ||
            (order.buyerEmail && order.buyerEmail.toLowerCase().includes(searchLower)) ||
            (order._id && order._id.toLowerCase().includes(searchLower));

        return statusMatch && searchMatch;
    });

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Helmet>
                <title>All Orders | Admin Panel</title>
            </Helmet>

          
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                        Manager / Admin Panel
                    </p>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                        All Orders
                    </h1>
                    <p className="text-sm text-slate-500">
                        Manage and track all customer orders here.
                    </p>
                </div>

                <div className="text-xs px-3 py-1.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200">
                    Total: <span className="font-semibold">{orders.length}</span> | Showing: <span className="font-semibold">{filteredOrders.length}</span>
                </div>
            </div>

          
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">

         
                <div className="relative w-full md:w-1/3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <FaSearch />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by Buyer Name or ID..."
                        className="input input-bordered input-sm w-full pl-10 rounded-full focus:outline-none focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

              
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="text-slate-400 text-sm flex items-center gap-1">
                        <FaFilter /> Filter by:
                    </div>
                    <select
                        className="select select-bordered select-sm rounded-full w-full md:w-40 capitalize"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="min-h-[30vh] flex flex-col items-center justify-center text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-sm font-medium">No matching orders found</p>
                    <p className="text-xs mt-1">
                        Try clearing your search or changing the filter.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
                    <table className="table table-sm">
                        <thead className="bg-slate-50">
                            <tr className="text-xs text-slate-500 uppercase">
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Buyer Info</th>
                                <th className="text-right">Qty</th>
                                <th>Status</th>
                                <th>Order Date</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                          
                            {filteredOrders.map((order, index) => (
                                <tr key={order._id} className="hover:bg-slate-50 border-b border-slate-100 last:border-none">
                                    <td>{index + 1}</td>

                                    <td className="font-mono text-[11px] text-slate-500">
                                        #{order._id?.slice(-6) || "—"}
                                    </td>

                                    <td>
                                        <p className="font-medium text-[12px] text-slate-700">
                                            {order.productName || "N/A"}
                                        </p>
                                    </td>

                                    <td>
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-semibold text-slate-800">
                                                {order.buyerName || "Unknown"}
                                            </span>
                                            <span className="text-[10px] text-slate-400">
                                                {order.buyerEmail}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="text-right font-medium">{order.quantity || 0}</td>

                                    <td>
                                        <span
                                            className={
                                                "badge badge-xs capitalize font-medium py-2 px-3 " +
                                                (order.status === "approved"
                                                    ? "bg-emerald-100 text-emerald-700 border-none"
                                                    : order.status === "rejected"
                                                        ? "bg-red-100 text-red-700 border-none"
                                                        : "bg-orange-100 text-orange-700 border-none") 
                                            }
                                        >
                                            {order.status || "pending"}
                                        </span>
                                    </td>

                                    <td className="text-[11px] text-slate-500">
                                        {order.createdAt
                                            ? new Date(order.createdAt).toLocaleDateString()
                                            : "—"}
                                    </td>

                                    <td className="text-right">
                                        <Link
                                            to={`/dashboard/orders/${order._id}`}
                                            className="btn btn-xs btn-outline btn-primary rounded-md"
                                        >
                                            Details
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
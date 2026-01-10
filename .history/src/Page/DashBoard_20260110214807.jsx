import React from "react";
// import useAuth from "../Hook/useAuth";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaDollarSign, FaChartPie, FaChartBar } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import useAuth from "../Hook /useAuth";
import useAxiosSecure from "../Hook /useAxiosSecure";

const DashBoard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="min-h-[60vh] flex items-center justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    // --- Chart Data Preparation ---
    // Bar Chart Data
    const barChartData = [
        { name: 'Products', count: stats.products || 0, fill: '#8884d8' },
        { name: 'Orders', count: stats.orders || 0, fill: '#82ca9d' },
        { name: 'Users', count: stats.users || 0, fill: '#ffc658' },
    ];

    // Pie Chart Data (Mocking revenue distribution for visual)
    const pieChartData = [
        { name: 'Revenue', value: stats.revenue || 100 },
        { name: 'Pending Cost', value: (stats.revenue * 0.4) || 40 }, // Just showing a ratio
    ];
    const COLORS = ['#0088FE', '#FF8042'];

    return (
        <div className="space-y-8">
            <Helmet>
                <title>Dashboard | Garments Tracker</title>
            </Helmet>

            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Hi, {user?.displayName || "Welcome Back"}! 👋
                    </h1>
                    <p className="text-slate-500">Here is your factory production overview.</p>
                </div>
                <div className="flex gap-2">
                    <span className="badge badge-primary badge-outline p-3">Date: {new Date().toLocaleDateString()}</span>
                </div>
            </div>

            {/* --- Stats Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="stat bg-white border border-slate-100 shadow-sm rounded-xl hover:shadow-md transition-shadow">
                    <div className="stat-figure text-primary text-3xl bg-blue-50 p-3 rounded-full">
                        <FaDollarSign />
                    </div>
                    <div className="stat-title font-medium">Total Revenue</div>
                    <div className="stat-value text-primary text-3xl">
                        ${stats.revenue || 0}
                    </div>
                    <div className="stat-desc text-slate-400">From approved orders</div>
                </div>

                <div className="stat bg-white border border-slate-100 shadow-sm rounded-xl hover:shadow-md transition-shadow">
                    <div className="stat-figure text-secondary text-3xl bg-purple-50 p-3 rounded-full">
                        <FaUsers />
                    </div>
                    <div className="stat-title font-medium">Total Users</div>
                    <div className="stat-value text-secondary text-3xl">
                        {stats.users || 0}
                    </div>
                    <div className="stat-desc text-slate-400">Buyers & Managers</div>
                </div>

                <div className="stat bg-white border border-slate-100 shadow-sm rounded-xl hover:shadow-md transition-shadow">
                    <div className="stat-figure text-accent text-3xl bg-emerald-50 p-3 rounded-full">
                        <FaBoxOpen />
                    </div>
                    <div className="stat-title font-medium">Inventory Items</div>
                    <div className="stat-value text-accent text-3xl">
                        {stats.products || 0}
                    </div>
                    <div className="stat-desc text-slate-400">Available products</div>
                </div>

                <div className="stat bg-white border border-slate-100 shadow-sm rounded-xl hover:shadow-md transition-shadow">
                    <div className="stat-figure text-info text-3xl bg-cyan-50 p-3 rounded-full">
                        <FaShoppingCart />
                    </div>
                    <div className="stat-title font-medium">Total Orders</div>
                    <div className="stat-value text-info text-3xl">
                        {stats.orders || 0}
                    </div>
                    <div className="stat-desc text-slate-400">Lifetime orders</div>
                </div>
            </div>

            {/* --- Charts Section --- */}
            <div className="grid lg:grid-cols-2 gap-8">

                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <FaChartBar className="text-blue-600" />
                        <h3 className="font-bold text-lg text-slate-800">Factory Statistics</h3>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={barChartData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    cursor={{ fill: '#f3f4f6' }}
                                />
                                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <FaChartPie className="text-orange-500" />
                        <h3 className="font-bold text-lg text-slate-800">Revenue Distribution</h3>
                    </div>
                    <div className="h-[300px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* --- Extra Info --- */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-xl shadow-sm text-white flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-lg">Production Efficiency</h3>
                        <p className="text-sm text-slate-400 mt-1">Based on active lines vs output</p>
                    </div>
                    <div className="radial-progress text-emerald-400 font-bold" style={{ "--value": 85 }} role="progressbar">85%</div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-lg text-slate-800">Need Tech Support?</h3>
                        <p className="text-sm text-slate-500">Contact system admin for issues.</p>
                    </div>
                    <button className="btn btn-sm btn-outline">Contact</button>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
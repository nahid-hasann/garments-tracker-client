import React from "react";
import useAuth from "../Hook /useAuth";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook /useAxiosSecure"; 
import { FaUsers, FaBoxOpen, FaShoppingCart, FaDollarSign } from "react-icons/fa"; 

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

    return (
        <div className="space-y-8">
            <Helmet>
                <title>Dashboard | Garments Tracker</title>
            </Helmet>

           
            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    Hi, {user?.displayName || "Welcome Back"}! 👋
                </h1>
                <p className="text-slate-500">Here is your factory overview.</p>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              
                <div className="stat bg-white border border-slate-100 shadow-sm rounded-xl">
                    <div className="stat-figure text-primary text-3xl">
                        <FaDollarSign />
                    </div>
                    <div className="stat-title">Total Revenue</div>
                    <div className="stat-value text-primary text-2xl">
                        ${stats.revenue || 0}
                    </div>
                    <div className="stat-desc">From paid orders</div>
                </div>

              
                <div className="stat bg-white border border-slate-100 shadow-sm rounded-xl">
                    <div className="stat-figure text-secondary text-3xl">
                        <FaUsers />
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value text-secondary text-2xl">
                        {stats.users || 0}
                    </div>
                    <div className="stat-desc">Buyers & Managers</div>
                </div>

                {/* Products Card */}
                <div className="stat bg-white border border-slate-100 shadow-sm rounded-xl">
                    <div className="stat-figure text-accent text-3xl">
                        <FaBoxOpen />
                    </div>
                    <div className="stat-title">Total Products</div>
                    <div className="stat-value text-accent text-2xl">
                        {stats.products || 0}
                    </div>
                    <div className="stat-desc">Items in inventory</div>
                </div>

                {/* Orders Card */}
                <div className="stat bg-white border border-slate-100 shadow-sm rounded-xl">
                    <div className="stat-figure text-info text-3xl">
                        <FaShoppingCart />
                    </div>
                    <div className="stat-title">Total Orders</div>
                    <div className="stat-value text-info text-2xl">
                        {stats.orders || 0}
                    </div>
                    <div className="stat-desc">Pending & Approved</div>
                </div>
            </div>

            {/* LOWER SECTION (Placeholder for Charts or Recent Activity) */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-lg mb-4">Factory Status</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-full bg-slate-100 rounded-full h-4">
                            <div className="bg-blue-600 h-4 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <span className="font-bold text-blue-600">70%</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Production line efficiency is good today.</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-center flex-col text-center">
                    <h3 className="font-bold text-lg">Need Help?</h3>
                    <p className="text-sm text-slate-500 mb-4">Contact the system admin for support.</p>
                    <button className="btn btn-sm btn-outline">Contact Support</button>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
import React from "react";
import { useQuery } from "@tanstack/react-query";
// import axios from "axios"; 
import useAuth from "../Hook /useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hook /useAxiosSecure";

const Profile = () => {
    const { user, logOut } = useAuth();
    const axiosSecure = useAxiosSecure();

    
    const {
        data: dbUser,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["db-user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        },
    });

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success("Logged out");
        } catch (err) {
            console.error(err);
            toast.error("Logout failed");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    if (isError) {
        return <div className="text-red-500">Failed to load profile.</div>;
    }

    const status = dbUser?.status || "pending";

    return (
        <div className="space-y-6">
            <Helmet>
                <title>My Profile | Dashboard</title>
            </Helmet>

            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
                <button onClick={handleLogout} className="btn btn-sm btn-outline">
                    Logout
                </button>
            </div>

            {/* 🔥 SUSPEND ALERT BOX (Challenge Requirement) */}
            {status === 'suspended' && (
                <div role="alert" className="alert alert-error text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div>
                        <h3 className="font-bold">Account Suspended!</h3>
                        <div className="text-sm">
                            Reason: <span className="font-semibold bg-white/20 px-2 rounded">
                                {dbUser?.suspendReason || "Violation of policy"}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center">
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="avatar" />
                    </div>
                </div>

                <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-xl font-bold">{dbUser?.name || user?.displayName}</h2>
                    <p className="text-slate-500">{user?.email}</p>

                    <div className="flex gap-3 justify-center md:justify-start mt-2">
                        <div className="badge badge-lg badge-primary capitalize">{dbUser?.role || "User"}</div>
                        <div className={`badge badge-lg capitalize ${status === 'active' ? 'badge-success text-white' :
                                status === 'suspended' ? 'badge-error text-white' : 'badge-warning'
                            }`}>
                            {status}
                        </div>
                    </div>

                    <p className="text-xs text-slate-400 pt-2">
                        Joined: {dbUser?.createdAt ? new Date(dbUser.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
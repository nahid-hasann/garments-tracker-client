import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../Hook /useAuth";
import toast from "react-hot-toast";

const Profile = () => {
    const { user, role, logOut } = useAuth();

    // logged-in firebase user না থাকলে simple fallback
    if (!user) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center text-sm text-slate-500">
                No user info found. Please login again.
            </div>
        );
    }

    // DB theke extra user info (status, createdAt etc) আনছি
    const {
        data: dbUser,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["db-user", user.email],
        enabled: !!user.email,
        queryFn: async () => {
            const res = await axios.get(
                `http://localhost:8000/users?email=${user.email}`
            );
            return res.data;
        },
    });

    const handleLogout = async () => {
        try {
            await logOut();   // 🔸 যদি তোমার AuthProvider এ নামটা অন্য কিছু হয়, সেটা ব্যবহার করবে
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
        return (
            <div className="min-h-[40vh] flex items-center justify-center text-sm text-red-500">
                Failed to load profile info: {error.message}
            </div>
        );
    }

    const finalRole = dbUser?.role || role || "buyer";
    const status = dbUser?.status || "pending";

    return (
        <div className="space-y-4">
            <Helmet>
                <title>My Profile | Dashboard</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                        Account
                    </p>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                        My Profile
                    </h1>
                    <p className="text-sm text-slate-500">
                        View your account details, role and status.
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline"
                >
                    Logout
                </button>
            </div>

            {/* Profile Card */}
            <div className="grid md:grid-cols-[1.2fr,1fr] gap-4">
                {/* Left: basic info */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4 items-center">
                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img
                                src={
                                    user.photoURL ||
                                    "https://i.ibb.co/4pDNDk1/avatar.png"
                                }
                                alt="avatar"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-slate-900">
                            {user.displayName || dbUser?.name || "Unnamed User"}
                        </p>
                        <p className="text-xs text-slate-500">
                            {user.email}
                        </p>
                        <p className="text-[11px] text-slate-400">
                            Joined:{" "}
                            {dbUser?.createdAt
                                ? new Date(dbUser.createdAt).toLocaleString()
                                : "N/A"}
                        </p>
                    </div>
                </div>

                {/* Right: role & status */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm space-y-2">
                    <p className="text-xs font-semibold text-slate-500">
                        Account Info
                    </p>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Role</span>
                        <span className="font-semibold capitalize">{finalRole}</span>
                    </div>
                    <div className="flex justify-between text-xs items-center">
                        <span className="text-slate-500">Status</span>
                        <span
                            className={`badge badge-xs capitalize ${status === "active"
                                    ? "badge-success"
                                    : status === "blocked" || status === "suspended"
                                        ? "badge-error"
                                        : "badge-ghost"
                                }`}
                        >
                            {status}
                        </span>
                    </div>
                </div>
            </div>

           
        </div>
    );
};

export default Profile;

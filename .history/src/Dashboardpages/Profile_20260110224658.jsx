import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hook /useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hook /useAxiosSecure";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
    const { user, logOut, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editName, setEditName] = useState("");
    const [editPhoto, setEditPhoto] = useState("");
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    // 1. Fetch User Data from Database
    const {
        data: dbUser = {},
        isLoading,
        isError,
        refetch
    } = useQuery({
        queryKey: ["db-user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        },
    });

    // 2. Set initial values when Modal Opens
    const openEditModal = () => {
        setEditName(dbUser?.name || user?.displayName || "");
        setEditPhoto(dbUser?.photo || user?.photoURL || "");
        setIsEditModalOpen(true);
    };

    // 3. Handle Update (Firebase + Database) - THE FIX IS HERE
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoadingUpdate(true);

        try {
            // A. Update Firebase Auth (For Login Session)
            await updateUserProfile(editName, editPhoto);

            // B. Update Database (For Dashboard Display)
            if (dbUser._id) {
                await axiosSecure.patch(`/users/${dbUser._id}`, {
                    name: editName,
                    photo: editPhoto
                });
            }

            // C. Refresh Data & UI
            await refetch(); // ডাটাবেস থেকে নতুন ডাটা আনবে
            setIsEditModalOpen(false);
            toast.success("Profile updated successfully!");

        } catch (error) {
            console.error("Update Error:", error);
            toast.error("Failed to update profile.");
        } finally {
            setLoadingUpdate(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success("Logged out");
        } catch (err) {
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

    const status = dbUser?.status || "pending";

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Helmet>
                <title>My Profile | Dashboard</title>
            </Helmet>

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
                <button onClick={handleLogout} className="btn btn-sm btn-outline text-red-500 hover:bg-red-50 hover:border-red-500">
                    Logout
                </button>
            </div>

            {/* Suspended Alert */}
            {status === 'suspended' && (
                <div role="alert" className="alert alert-error text-white shadow-lg">
                    <span>Account Suspended: {dbUser?.suspendReason || "Violation of policy"}</span>
                </div>
            )}

            {/* --- Profile Card --- */}
            <div className="bg-white border border-slate-200 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center md:items-start relative shadow-sm">

                {/* Edit Button */}
                <button
                    onClick={openEditModal}
                    className="absolute top-4 right-4 btn btn-sm btn-ghost text-blue-600 hover:bg-blue-50 gap-2"
                >
                    <FaEdit /> Edit Profile
                </button>

                {/* Image Display */}
                <div className="avatar">
                    <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        {/* dbUser.photo priority, then user.photoURL */}
                        <img src={dbUser?.photo || user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="avatar" />
                    </div>
                </div>

                {/* Info Display */}
                <div className="space-y-4 text-center md:text-left flex-1">
                    <div>
                        {/* dbUser.name priority, then user.displayName */}
                        <h2 className="text-2xl font-bold text-slate-900">{dbUser?.name || user?.displayName || "No Name"}</h2>
                        <p className="text-slate-500">{user?.email}</p>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <div className="badge badge-lg badge-primary capitalize px-4 py-3">{dbUser?.role || "User"}</div>
                        <div className={`badge badge-lg capitalize px-4 py-3 ${status === 'active' ? 'badge-success text-white' : status === 'suspended' ? 'badge-error text-white' : 'badge-warning'}`}>
                            {status}
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-600 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mt-2">
                        <div>
                            <p className="font-semibold text-slate-400 text-xs uppercase">User ID</p>
                            <p className="font-mono text-xs overflow-hidden text-ellipsis">{dbUser?._id}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-400 text-xs uppercase">Joined On</p>
                            <p>{dbUser?.createdAt ? new Date(dbUser.createdAt).toLocaleDateString() : "N/A"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Edit Modal --- */}
            {isEditModalOpen && (
                <dialog open className="modal modal-bottom sm:modal-middle bg-slate-900/50 backdrop-blur-sm">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Edit Profile</h3>
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Full Name</span></label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Photo URL</span></label>
                                <input
                                    type="url"
                                    className="input input-bordered w-full"
                                    value={editPhoto}
                                    onChange={(e) => setEditPhoto(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="modal-action">
                                <button type="button" className="btn" onClick={() => setIsEditModalOpen(false)} disabled={loadingUpdate}>Cancel</button>
                                <button type="submit" className="btn btn-primary text-white" disabled={loadingUpdate}>
                                    {loadingUpdate ? <span className="loading loading-spinner"></span> : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default Profile;
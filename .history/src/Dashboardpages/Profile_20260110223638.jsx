import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hook /useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hook /useAxiosSecure";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
    const { user, logOut, updateUserProfile } = useAuth(); // updateUserProfile হুক থেকে আনা হয়েছে
    const axiosSecure = useAxiosSecure();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Edit States
    const [editName, setEditName] = useState("");
    const [editPhoto, setEditPhoto] = useState("");
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    // Fetch DB User
    const {
        data: dbUser,
        isLoading,
        isError,
        refetch // ডাটা আপডেটের পর রিফ্রেশ করার জন্য
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

    // Open Modal & Set Initial Values
    const openEditModal = () => {
        setEditName(user?.displayName || "");
        setEditPhoto(user?.photoURL || "");
        setIsEditModalOpen(true);
    };

    // Handle Update Profile
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoadingUpdate(true);

        try {
            // 1. Firebase Update (Name & Photo)
            await updateUserProfile(editName, editPhoto);

            // 2. Database Update (Optional - যদি ডাটাবেসেও নাম সেভ রাখেন)
            // await axiosSecure.patch(`/users/${dbUser._id}`, { name: editName });

            toast.success("Profile updated successfully!");
            refetch(); // রিফ্রেশ ডাটা
            setIsEditModalOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile.");
        } finally {
            setLoadingUpdate(false);
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
            <div className="bg-white border border-slate-200 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center md:items-start relative shadow-sm">

                {/* Edit Button (Top Right) */}
                <button
                    onClick={openEditModal}
                    className="absolute top-4 right-4 btn btn-sm btn-ghost text-blue-600 hover:bg-blue-50 gap-2"
                >
                    <FaEdit /> Edit Profile
                </button>

                <div className="avatar">
                    <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="avatar" />
                    </div>
                </div>

                <div className="space-y-4 text-center md:text-left flex-1">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">{user?.displayName || "No Name"}</h2>
                        <p className="text-slate-500">{user?.email}</p>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <div className="badge badge-lg badge-primary capitalize px-4 py-3">{dbUser?.role || "User"}</div>
                        <div className={`badge badge-lg capitalize px-4 py-3 ${status === 'active' ? 'badge-success text-white' :
                            status === 'suspended' ? 'badge-error text-white' : 'badge-warning'
                            }`}>
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
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="input input-bordered w-full"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="url"
                                    placeholder="Enter photo URL"
                                    className="input input-bordered w-full"
                                    value={editPhoto}
                                    onChange={(e) => setEditPhoto(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="modal-action">
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => setIsEditModalOpen(false)}
                                    disabled={loadingUpdate}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary text-white"
                                    disabled={loadingUpdate}
                                >
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
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook /useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const [selectedUser, setSelectedUser] = useState(null);
    const [reason, setReason] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        data: users = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users/all");
            return res.data;
        },
    });

    const handleUpdateUser = async (id, payload) => {
        try {
            const res = await axiosSecure.patch(`/users/${id}`, payload);
            if (res.data.modifiedCount > 0) {
                toast.success("User status updated");
                refetch();
                closeModal();
            }
        } catch (err) {
            console.error("Update failed", err);
            toast.error("Failed to update");
        }
    };

    const handleMakeManager = (u) => {
        if (window.confirm(`Promote ${u.name} to Manager?`)) {
            handleUpdateUser(u._id, { role: "manager", status: "active" });
        }
    };

    const handleApprove = (u) => {
        handleUpdateUser(u._id, { status: "active" });
    };

    const openSuspendModal = (user) => {
        setSelectedUser(user);
        setReason("");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleSuspendSubmit = () => {
        if (!reason.trim()) {
            return toast.error("Please write a reason!");
        }

        handleUpdateUser(selectedUser._id, {
            status: "suspended",
            suspendReason: reason
        });
    };

    if (isLoading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-blue-600"></span>
        </div>
    );

    if (isError) return <div className="text-red-500">Error: {error.message}</div>;

    return (
        <div className="space-y-6">
            <Helmet>
                <title>Manage Users | Admin Panel</title>
            </Helmet>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Manage Users</h1>
                    <p className="text-sm text-slate-500">Control user roles and access</p>
                </div>
                <div className="badge badge-primary badge-outline p-3">Total Users: {users.length}</div>
            </div>

            <div className="md:hidden flex flex-col gap-4">
                {users.map((u) => (
                    <div key={u._id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-slate-900">{u.name}</h3>
                                <p className="text-xs text-slate-500 break-all">{u.email}</p>
                            </div>
                            <span className={`badge badge-sm capitalize ${u.status === 'active' ? 'badge-success text-white' :
                                    u.status === 'suspended' ? 'badge-error text-white' : 'badge-warning'
                                }`}>
                                {u.status}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm border-t border-slate-100 pt-2">
                            <span className="text-slate-500">Role:</span>
                            <span className={`font-medium capitalize ${u.role === 'admin' ? 'text-blue-600' : u.role === 'manager' ? 'text-purple-600' : 'text-slate-600'}`}>
                                {u.role}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-1">
                            {u.role !== "manager" && u.role !== "admin" && (
                                <button onClick={() => handleMakeManager(u)} className="btn btn-xs btn-outline w-full">
                                    Make Manager
                                </button>
                            )}

                            {u.status !== "active" && (
                                <button onClick={() => handleApprove(u)} className="btn btn-xs btn-success text-white w-full">
                                    Approve
                                </button>
                            )}

                            {u.status !== "suspended" && u.role !== "admin" && (
                                <button onClick={() => openSuspendModal(u)} className="btn btn-xs btn-error text-white w-full">
                                    Suspend
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold">
                            <tr>
                                <th className="py-4">#</th>
                                <th>User Info</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((u, idx) => (
                                <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                                    <th className="text-slate-400 font-normal">{idx + 1}</th>
                                    <td>
                                        <div className="font-bold text-slate-900">{u.name}</div>
                                        <div className="text-xs text-slate-500 font-mono">{u.email}</div>
                                    </td>
                                    <td>
                                        <span className={`font-medium capitalize ${u.role === 'admin' ? 'text-blue-600' : u.role === 'manager' ? 'text-purple-600' : 'text-slate-600'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge badge-sm border-0 capitalize ${u.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                                                u.status === 'suspended' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {u.role !== "manager" && u.role !== "admin" && (
                                                <button onClick={() => handleMakeManager(u)} className="btn btn-xs btn-outline border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                                                    Make Manager
                                                </button>
                                            )}

                                            {u.status !== "active" && (
                                                <button onClick={() => handleApprove(u)} className="btn btn-xs btn-success text-white">
                                                    Approve
                                                </button>
                                            )}

                                            {u.status !== "suspended" && u.role !== "admin" && (
                                                <button onClick={() => openSuspendModal(u)} className="btn btn-xs btn-error text-white">
                                                    Suspend
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && selectedUser && (
                <dialog open className="modal modal-bottom sm:modal-middle bg-slate-900/50 backdrop-blur-sm">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-red-600">Suspend User Access</h3>
                        <p className="py-2 text-sm text-slate-600">
                            You are about to suspend <span className="font-bold text-slate-900">{selectedUser.name}</span>.
                        </p>

                        <div className="form-control w-full mt-4">
                            <label className="label">
                                <span className="label-text font-medium">Reason for Suspension</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered h-24 focus:outline-none focus:border-red-500"
                                placeholder="e.g. Violation of community guidelines..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="modal-action mt-6">
                            <button onClick={closeModal} className="btn btn-sm btn-ghost">Cancel</button>
                            <button onClick={handleSuspendSubmit} className="btn btn-sm btn-error text-white">
                                Confirm Suspend
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ManageUsers;
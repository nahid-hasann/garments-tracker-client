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

    // Handle Suspend Submit
    const handleSuspendSubmit = () => {
        if (!reason.trim()) {
            return toast.error("Please write a reason!");
        }
        // Call API with status 'suspended' and the reason
        handleUpdateUser(selectedUser._id, {
            status: "suspended",
            suspendReason: reason
        });
    };

    if (isLoading) return <span className="loading loading-spinner loading-lg text-blue-600"></span>;
    if (isError) return <div className="text-red-500">Error: {error.message}</div>;

    return (
        <div className="space-y-4">
            <Helmet>
                <title>Manage Users | Admin Panel</title>
            </Helmet>

            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Manage Users</h1>
                <div className="badge badge-outline">Total: {users.length}</div>
            </div>

            <div className="overflow-x-auto bg-white rounded-xl border">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, idx) => (
                            <tr key={u._id}>
                                <td>{idx + 1}</td>
                                <td>{u.name}</td>
                                <td className="font-mono text-xs">{u.email}</td>
                                <td className="capitalize">{u.role}</td>
                                <td>
                                    <span className={`badge badge-xs capitalize ${u.status === 'active' ? 'badge-success' :
                                            u.status === 'suspended' ? 'badge-error' : 'badge-warning'
                                        }`}>
                                        {u.status}
                                    </span>
                                </td>
                                <td className="text-right space-x-2">
                                    {/* Make Manager */}
                                    {u.role !== "manager" && (
                                        <button onClick={() => handleMakeManager(u)} className="btn btn-xs btn-ghost border-slate-200">
                                            Make Manager
                                        </button>
                                    )}

                                    {/* Approve (if pending/suspended) */}
                                    {u.status !== "active" && (
                                        <button onClick={() => handleApprove(u)} className="btn btn-xs btn-success text-white">
                                            Approve
                                        </button>
                                    )}

                                    {/* Suspend Button (Open Modal) */}
                                    {u.status !== "suspended" && (
                                        <button onClick={() => openSuspendModal(u)} className="btn btn-xs btn-error text-white">
                                            Suspend
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ====== SUSPEND MODAL ====== */}
            {isModalOpen && selectedUser && (
                <dialog open className="modal modal-bottom sm:modal-middle bg-black/50">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-red-600">Suspend User</h3>
                        <p className="py-2 text-sm">
                            You are about to suspend <span className="font-bold">{selectedUser.name}</span>.
                            Please provide a reason so they can see it in their profile.
                        </p>

                        <textarea
                            className="textarea textarea-bordered w-full mt-2"
                            placeholder="Reason for suspension (e.g. Violation of rules)..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        ></textarea>

                        <div className="modal-action">
                            <button onClick={closeModal} className="btn btn-sm">Cancel</button>
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
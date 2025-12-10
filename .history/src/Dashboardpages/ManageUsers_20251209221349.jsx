import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

const ManageUsers = () => {

    const {
        data: users = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:8000/users/all");
            return res.data;
        },
    });

    const handleUpdateUser = async (id, payload) => {
        const res = await axios.patch(`users/${id}`)
        if (res.data.modifiedCount > 0) {
            toast.success("User updated");
            refetch();
        }
    }

    const handleMakeManager = (u) => {
        handleUpdateUser(u._id, { role: "manager", status: "active" })
    }

    const handleApprove = (u) => {
        handleUpdateUser(u._id, { staus: "active" })

    }

    if (isLoading) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center text-red-500 text-sm">
                Failed to load users: {error.message}
            </div>
        );
    }


    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                        Manager Panel
                    </p>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                        Manage Users
                    </h1>
                    <p className="text-sm text-slate-500">
                        Approve buyers, promote managers and control access.
                    </p>
                </div>

                <div className="text-xs px-3 py-1.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200">
                    Total users: <span className="font-semibold">{users.length}</span>
                </div>
            </div>

            {/* No users */}
            {userss.length === 0 ? (
                <div className="min-h-[30vh] flex flex-col items-center justify-center text-slate-500 text-sm">
                    <p>No users found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                    <table className="table table-sm">
                        <thead>
                            <tr className="text-xs text-slate-500">
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="text-xs">
                            {userss.map((u, idx) => (
                                <tr key={u._id}>
                                    <td>{idx + 1}</td>

                                    <td>
                                        <p className="font-medium text-[12px]">
                                            {u.name || u.displayName || "Unknown"}
                                        </p>
                                    </td>

                                    <td className="text-[11px] text-slate-500">{u.email}</td>

                                    <td className="capitalize">
                                        <span className="badge badge-ghost badge-xs">
                                            {u.role || "buyer"}
                                        </span>
                                    </td>

                                    <td>
                                        <span
                                            className={
                                                "badge badge-xs capitalize " +
                                                (u.status === "active"
                                                    ? "badge-success"
                                                    : u.status === "blocked"
                                                        ? "badge-error"
                                                        : "badge-warning")
                                            }
                                        >
                                            {u.status || "pending"}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="flex justify-end gap-2">
                                            {/* Approve */}
                                            <button
                                                onClick={() => handleApprove(u)}
                                                className="btn btn-xs btn-success"
                                                disabled={u.status === "active"}
                                            >
                                                Approve
                                            </button>

                                            {/* Make Manager */}
                                            <button
                                                onClick={() => handleMakeManager(u)}
                                                className="btn btn-xs"
                                                disabled={u.role === "manager"}
                                            >
                                                Make Manager
                                            </button>
                                        </div>
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

export default ManageUsers;
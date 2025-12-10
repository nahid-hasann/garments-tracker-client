import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const ManageUsers = () => {
    // সব users লোড করা
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

    // common update function
    const handleUpdateUser = async (id, payload) => {
        try {
            const res = await axios.patch(
                `http://localhost:8000/users/${id}`,
                payload
            );

            if (res.data.modifiedCount > 0) {
                toast.success("User updated");
                refetch(); // নতুন ডাটা আনবে
            } else {
                toast("No changes applied");
            }
        } catch (err) {
            console.error("Update user failed", err);
            toast.error("Failed to update user");
        }
    };

    // Make Manager
    const handleMakeManager = (u) => {
        handleUpdateUser(u._id, { role: "manager", status: "active" });
    };

    // Approve user (pending -> active)
    const handleApprove = (u) => {
        handleUpdateUser(u._id, { status: "active" });
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
                        Approve buyers and promote managers.
                    </p>
                </div>

                <div className="text-xs px-3 py-1.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200">
                    Total users: <span className="font-semibold">{users.length}</span>
                </div>
            </div>

            {/* No users */}
            {users.length === 0 ? (
                <div className="min-h-[30vh] flex items-center justify-center text-slate-500 text-sm">
                    No users found.
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
                            {users.map((u, idx) => (
                                <tr key={u._id}>
                                    <td>{idx + 1}</td>

                                    <td className="font-medium">{u.name || u.displayName || "—"}</td>

                                    <td className="font-mono text-[11px]">{u.email}</td>

                                    <td className="capitalize">{u.role || "buyer"}</td>

                                    <td className="capitalize">
                                        <span
                                            className={`badge badge-xs ${u.status === "active"
                                                    ? "badge-success"
                                                    : u.status === "blocked"
                                                        ? "badge-error"
                                                        : "badge-ghost"
                                                }`}
                                        >
                                            {u.status || "pending"}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="flex justify-end gap-2">
                                            {/* Make Manager button */}
                                            {u.role !== "manager" && (
                                                <button
                                                    onClick={() => handleMakeManager(u)}
                                                    className="btn btn-xs"
                                                >
                                                    Make Manager
                                                </button>
                                            )}

                                            {/* Approve button (only if pending) */}
                                            {u.status !== "active" && (
                                                <button
                                                    onClick={() => handleApprove(u)}
                                                    className="btn btn-xs btn-success"
                                                >
                                                    Approve
                                                </button>
                                            )}
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

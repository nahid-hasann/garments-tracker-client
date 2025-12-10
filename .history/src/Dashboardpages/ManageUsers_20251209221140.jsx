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

    if (isLoading) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
      }

      

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
      handleUpdateUser(u._id, {staus: "active"} )
    }

    return (
        <div>

        </div>
    );
};

export default ManageUsers;
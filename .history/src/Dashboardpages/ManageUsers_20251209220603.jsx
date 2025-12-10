import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

const ManageUsers = () => {

    const handleUpdateUser = async (id, payload) => {
        const res = await axios.patch(`users/${id}`)
        if (res.data.modifiedCount > 0) {
            toast.success("User updated");
            refetch();
        }
    }

    const handleMakeManager = (u) => {
      
    }

    return (
        <div>

        </div>
    );
};

export default ManageUsers;
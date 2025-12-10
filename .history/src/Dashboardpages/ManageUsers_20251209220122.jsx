import axios from 'axios';
import React from 'react';

const ManageUsers = () => {
     const handleUpdateUser = (id, payload) => {
         const res = await axios.patch(`users/${id}`)
         return res.
     }
    return (
        <div>
            
        </div>
    );
};

export default ManageUsers;
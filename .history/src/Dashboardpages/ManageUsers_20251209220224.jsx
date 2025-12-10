import axios from 'axios';
import React from 'react';

const ManageUsers = () => {
     const handleUpdateUser = (id, payload) => {
         const res = await axios.patch(`users/${id}`)
         if (res.data.modifiedCount > 0){
            
         }
     }
    return (
        <div>
            
        </div>
    );
};

export default ManageUsers;
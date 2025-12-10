import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const PendingOrders = () => {

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8000/orders');
            return res.data;
        }
    });

    const pendingOrders = orders.filter(order => order.status === "pending");

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:8000/orders/${id}`, {
                status: newStatus,
            });
            // পাশে toast use করো চাইলে
            // toast.success(`Order ${newStatus}`);
            refetch(); // data notun kore load hobe
        } catch (err) {
            console.error("Status update failed", err);
            // toast.error("Failed to update");
        }
    };
      

    return (
        <div>

        </div>
    );
};

export default PendingOrders;
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../Hook /useAuth';
import axios from 'axios';

const MyOrders = () => {
    const { user } = useAuth();

    const { } = useQuery({
        queryKey: ["my-orders", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(
                `http://localhost:8000/orders?email=${user.email}`
            );
            return res.data;
        }
    })

    return (
        <div>

        </div>
    );
};

export default MyOrders;
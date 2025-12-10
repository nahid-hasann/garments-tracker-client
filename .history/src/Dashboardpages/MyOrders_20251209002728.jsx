import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../Hook /useAuth';

const MyOrders = () => {
    const { user } = useAuth();

    const { } = useQuery({
        queryKey: ["my-orders", user?.email],
        enabled: 
        queryFn: 
    })

    return (
        <div>

        </div>
    );
};

export default MyOrders;
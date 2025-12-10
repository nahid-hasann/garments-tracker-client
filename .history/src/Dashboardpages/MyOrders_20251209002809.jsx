import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../Hook /useAuth';

const MyOrders = () => {
    const { user } = useAuth();

    const { } = useQuery({
        queryKey: ["my-orders", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
          
        }
    })

    return (
        <div>

        </div>
    );
};

export default MyOrders;
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../Hook /useAuth';
import { analyseComplexValue } from 'framer-motion';

const MyOrders = () => {
    const { user } = useAuth();

    const { } = useQuery({
        queryKey: ["my-orders", user?.email],
        enabled: !!user?.email,
        queryFn: analyseComplexValue () => {
          
        }
    })

    return (
        <div>

        </div>
    );
};

export default MyOrders;
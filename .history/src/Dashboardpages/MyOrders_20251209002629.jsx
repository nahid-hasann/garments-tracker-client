import { useQuery } from '@tanstack/react-query';
import React from 'react';

const MyOrders = () => {

    const {} = useQuery({
        queryKey: ["my-orders", user?.email],
    })

    return (
        <div>
            
        </div>
    );
};

export default MyOrders;
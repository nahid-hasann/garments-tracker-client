import { useQuery } from '@tanstack/react-query';
import React from 'react';

const PendingOrders = () => {

    const { } = useQuery({
        queryKey: ['orders']
    })

    return (
        <div>
            
        </div>
    );
};

export default PendingOrders;
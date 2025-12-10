import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const PendingOrders = () => {

    const { } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
          const res = axios.get('')
        }
    })

    return (
        <div>
            
        </div>
    );
};

export default PendingOrders;
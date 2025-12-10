import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const PendingOrders = () => {

    const { data :  } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8000/orders')
            return res.data
        }
    })

    return (
        <div>

        </div>
    );
};

export default PendingOrders;
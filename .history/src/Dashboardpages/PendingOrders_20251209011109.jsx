import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const PendingOrders = () => {

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8000/orders');
            return res.data;
        }
      });

      const PendingOrders =  orders.filter(order => order.status === "pending" )

    return (
        <div>

        </div>
    );
};

export default PendingOrders;
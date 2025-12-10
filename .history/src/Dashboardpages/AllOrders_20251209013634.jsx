import React from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const AllOrders = () => {

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["all-orders"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:8000/orders/all");
            return res.data;
        },
    });
      

    return (
        <div>
            
        </div>
    );
};

export default AllOrders;
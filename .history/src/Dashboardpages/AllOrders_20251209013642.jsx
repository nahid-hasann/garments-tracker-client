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

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }
      
      

    return (
        <div>
            
        </div>
    );
};

export default AllOrders;
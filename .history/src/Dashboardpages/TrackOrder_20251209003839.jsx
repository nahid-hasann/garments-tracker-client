import React from 'react';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../Hook/useAuth";


const TrackOrder = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState("");

    const {
        data: orders = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["my-orders", user?.email],
        enabled: !!user?.email, // user আসলে তবেই call
        queryFn: async () => {
            const res = await axios.get(
                `http://localhost:8000/orders?email=${user.email}`
            );
            return res.data;
        },
      });


    if (isLoading) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center text-red-500 text-sm">
                Failed to load orders: {error.message}
            </div>
        );
    }

    const filteredOrders = orders.filter((order) => {
        if (!search) return true;

        const term = search.toLowerCase();
        return (
            (order.productName || "").toLowerCase().includes(term) ||
            (order._id || "").toLowerCase().includes(term)
        );
    });
    
    

    return (
        <div>
            
        </div>
    );
};

export default TrackOrder;
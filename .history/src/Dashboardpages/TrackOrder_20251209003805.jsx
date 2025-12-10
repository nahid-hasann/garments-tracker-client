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
    return (
        <div>
            
        </div>
    );
};

export default TrackOrder;
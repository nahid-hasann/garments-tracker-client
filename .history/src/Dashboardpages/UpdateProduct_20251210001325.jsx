import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

const UpdateProduct = () => {
    const { id } = useParams();

    // Load single product
    const { data: product, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/products/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="min-h-[30vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!product) {
        return <p className="text-center text-red-500">Product not found.</p>;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold">Update Product</h1>
            <p className="text-sm text-slate-500">Product ID: {id}</p>

            {/* Initial form skeleton */}
            <div className="grid gap-3 max-w-lg">
                <input
                    type="text"
                    defaultValue={product.name}
                    className="input input-bordered"
                    readOnly
                />
                <input
                    type="number"
                    defaultValue={product.price}
                    className="input input-bordered"
                    readOnly
                />

                <p className="text-xs text-slate-500">
                    👇 Next step (16.4) এ এগুলো editable form করা হবে।
                </p>
            </div>
        </div>
    );
};

export default UpdateProduct;

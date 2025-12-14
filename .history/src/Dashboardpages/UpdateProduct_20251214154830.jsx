import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../Hook /useAxiosSecure";

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

 
    const { data: product, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!product) {
        return (
            <p className="text-center text-red-500">Product not found.</p>
        );
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;

        const updatedProduct = {
            name: form.name.value,
            description: form.description.value,
            category: form.category.value,
            price: parseFloat(form.price.value),
            availableQty: parseInt(form.availableQty.value),
            minQty: parseInt(form.minQty.value),
            paymentOptions: form.paymentOptions.value,
            showOnHome: form.showOnHome.checked,
        };

        try {
            const res = await axiosSecure.patch(
                `/products/${id}`,
                updatedProduct
            );

            if (res.data.modifiedCount > 0) {
                toast.success("Product updated successfully!");
                navigate("/dashboard/manage-products");
            } else {
                toast("No changes applied");
            }
        } catch (error) {
            toast.error("Failed to update product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-5">
            <h1 className="text-2xl font-bold">Update Product</h1>
            <p className="text-sm text-slate-500">Product ID: {id}</p>

            <form
                onSubmit={handleUpdate}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 rounded-xl border"
            >
              
                <input
                    name="name"
                    defaultValue={product.name}
                    className="input input-bordered w-full"
                    placeholder="Product Name"
                    required
                />

                {/* Category */}
                <select
                    name="category"
                    defaultValue={product.category}
                    className="select select-bordered w-full"
                >
                    <option value="Shirt">Shirt</option>
                    <option value="Pant">Pant</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Accessories">Accessories</option>
                </select>

                {/* Price */}
                <input
                    name="price"
                    type="number"
                    defaultValue={product.price}
                    className="input input-bordered w-full"
                    placeholder="Price"
                    required
                />

                {/* Available Quantity */}
                <input
                    name="availableQty"
                    type="number"
                    defaultValue={product.availableQty}
                    className="input input-bordered w-full"
                    placeholder="Available Quantity"
                    required
                />

                {/* Minimum order quantity */}
                <input
                    name="minQty"
                    type="number"
                    defaultValue={product.minQty}
                    className="input input-bordered w-full"
                    placeholder="Minimum Order Quantity"
                    required
                />

                {/* Payment Options */}
                <select
                    name="paymentOptions"
                    defaultValue={product.paymentOptions}
                    className="select select-bordered w-full"
                >
                    <option value="cod">Cash on Delivery</option>
                    <option value="payfast">PayFirst</option>
                </select>

                {/* Description */}
                <textarea
                    name="description"
                    defaultValue={product.description}
                    className="textarea textarea-bordered md:col-span-2"
                    placeholder="Description"
                    required
                ></textarea>

                {/* Show on Home checkbox */}
                <label className="flex items-center gap-3 md:col-span-2">
                    <input
                        type="checkbox"
                        name="showOnHome"
                        className="checkbox"
                        defaultChecked={product.showOnHome}
                    />
                    <span className="text-sm">Show on Home Page</span>
                </label>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary md:col-span-2"
                >
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;

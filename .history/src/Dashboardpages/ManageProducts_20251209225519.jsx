import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

const ManageProducts = () => {

    const {
        data: products = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["manage-products"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:8000/products");
            return res.data;
        },
      });

    const handleDeleteProduct = (product) => {
      const sure = window.confirm(
          `Are you sure you want to delete "${product.name || "this product"}"?`
      )
        if (!sure) return;

        const res =  axios.delete(
            `http://localhost:8000/products/${product._id}`
          );

        if (res.data.deletedCount > 0) {
            toast.success("Product deleted");
            refetch(); 
        } 

    }

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
                Failed to load products: {error.message}
            </div>
        );
      }

    return (
        <div>
            
        </div>
    );
};

export default ManageProducts;
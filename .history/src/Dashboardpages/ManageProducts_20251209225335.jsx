import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

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

    const handleDeleteProduct = () => {
      const sure = window.confirm(
          `Are you sure you want to delete "${product.name || "this product"}"?`
      )
    }

    return (
        <div>
            
        </div>
    );
};

export default ManageProducts;
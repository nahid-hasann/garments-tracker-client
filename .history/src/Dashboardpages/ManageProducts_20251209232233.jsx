import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ManageProducts = () => {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");



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

    const filteredProducts = products.filter((p) => {
        const name = (p.name || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        const term = search.toLowerCase().trim();

        // category filter
        if (category !== "all" && cat !== category.toLowerCase()) {
            return false;
        }

        // search filter (name বা category match)
        if (term && !name.includes(term) && !cat.includes(term)) {
            return false;
        }

        return true;
    });n true;
})

const handleDeleteProduct = async (product) => {
    const sure = window.confirm(
        `Are you sure you want to delete "${product.name || "this product"}"?`
    );
    if (!sure) return;

    try {
        const res = await axios.delete(
            `http://localhost:8000/products/${product._id}`
        );

        if (res.data.deletedCount > 0) {
            toast.success("Product deleted");
            refetch();
        } else {
            toast("No product deleted");
        }
    } catch (err) {
        console.error("Delete product failed", err);
        toast.error("Failed to delete product");
    }
};

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
    <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                    Manager Panel
                </p>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                    Manage Products
                </h1>
                <p className="text-sm text-slate-500">
                    View and remove products from the factory catalog.
                </p>
            </div>

            <div className="text-xs px-3 py-1.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200">
                Total products: <span className="font-semibold">{products.length}</span>
            </div>
        </div>

        {/* No products */}
        {products.length === 0 ? (
            <div className="min-h-[30vh] flex items-center justify-center text-slate-500 text-sm">
                No products found. Please add some products first.
            </div>
        ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="table table-sm">
                    <thead>
                        <tr className="text-xs text-slate-500">
                            <th>#</th>
                            <th>Product</th>
                            <th>Buyer</th>
                            <th className="text-right">Min Qty</th>
                            <th className="text-right">Price</th>
                            <th>Show on Home</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {products.map((p, idx) => (
                            <tr key={p._id}>
                                <td>{idx + 1}</td>

                                {/* Product name */}
                                <td>
                                    <p className="font-medium text-[13px]">
                                        {p.name || "Unnamed product"}
                                    </p>
                                    {p.category && (
                                        <p className="text-[11px] text-slate-400">
                                            Category: {p.category}
                                        </p>
                                    )}
                                </td>

                                {/* Buyer */}
                                <td>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] font-medium">
                                            {p.buyerName || "—"}
                                        </span>
                                        {p.buyerEmail && (
                                            <span className="text-[11px] text-slate-400">
                                                {p.buyerEmail}
                                            </span>
                                        )}
                                    </div>
                                </td>

                                {/* Min quantity */}
                                <td className="text-right">
                                    {p.minQty ?? p.quantity ?? 0}
                                </td>

                                {/* Price */}
                                <td className="text-right">
                                    {p.price ? `$${p.price}` : "On request"}
                                </td>

                                {/* showOnHome flag */}
                                <td>
                                    <span
                                        className={`badge badge-xs ${p.showOnHome ? "badge-success" : "badge-ghost"
                                            }`}
                                    >
                                        {p.showOnHome ? "Yes" : "No"}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td>
                                    <div className="flex justify-end gap-2">
                                        {/* Future: Edit button */}
                                        {/* <button className="btn btn-xs btn-outline">Edit</button> */}

                                        <button
                                            onClick={() => handleDeleteProduct(p)}
                                            className="btn btn-xs btn-error"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
);
};

export default ManageProducts;
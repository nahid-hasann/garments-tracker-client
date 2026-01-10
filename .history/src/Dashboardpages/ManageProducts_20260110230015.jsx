import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { FaEdit, FaTrashAlt, FaBox, FaUser, FaTag } from 'react-icons/fa';
import useAxiosSecure from '../Hook /useAxiosSecure';

const ManageProducts = () => {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const axiosSecure = useAxiosSecure();

    const {
        data: productData = {},
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["manage-products"],
        queryFn: async () => {
            const res = await axiosSecure.get("/products");
            return res.data;
        },
    });

    const products = productData.products || [];

    const filteredProducts = products.filter((p) => {
        const name = (p.name || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        const term = search.toLowerCase().trim();

        if (category !== "all" && cat !== category.toLowerCase()) {
            return false;
        }

        if (term && !name.includes(term) && !cat.includes(term)) {
            return false;
        }

        return true;
    });

    const handleDeleteProduct = async (product) => {
        const sure = window.confirm(
            `Are you sure you want to delete "${product.name || "this product"}"?`
        );
        if (!sure) return;

        try {
            const res = await axiosSecure.delete(`/products/${product._id}`);

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
        <div className="space-y-6">
            <Helmet>
                <title>Manage Products | Manager Panel</title>
            </Helmet>

            {/* --- Header Section --- */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

                <div className="text-xs px-3 py-1.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200 w-fit">
                    Total: <span className="font-semibold">{products.length}</span>
                </div>
            </div>

            {/* --- Filter & Search Section --- */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <input
                    type="text"
                    placeholder="Search by name or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered input-sm w-full md:w-64 rounded-full"
                />

                <select
                    className="select select-bordered select-sm w-full md:w-40 rounded-full capitalize"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="all">All categories</option>
                    <option value="shirt">Shirt</option>
                    <option value="pant">Pant</option>
                    <option value="jacket">Jacket</option>
                    <option value="hoodie">Hoodie</option>
                    <option value="others">Others</option>
                </select>
            </div>

            {/* --- Content Section --- */}
            {products.length === 0 ? (
                <div className="min-h-[30vh] flex flex-col items-center justify-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-sm font-medium">No products found</p>
                    <p className="text-xs mt-1">Please add some products first.</p>
                </div>
            ) : (
                <>
                    {/* --- Mobile View: Cards (< 768px) --- */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {filteredProducts.map((p) => (
                            <div key={p._id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                                {/* Header: Name & Price */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                            <FaBox className="text-slate-400 text-xs" />
                                            {p.name || "Unnamed"}
                                        </h3>
                                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded mt-1 inline-block">
                                            {p.category || "No Category"}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-blue-600">{p.price ? `$${p.price}` : "N/A"}</p>
                                        <span className={`badge badge-xs mt-1 ${p.showOnHome ? "badge-success text-white" : "badge-ghost"}`}>
                                            Home: {p.showOnHome ? "Yes" : "No"}
                                        </span>
                                    </div>
                                </div>

                                {/* Body: Buyer Info & Qty */}
                                <div className="text-xs text-slate-600 space-y-1 border-t border-slate-100 pt-2 mt-1">
                                    <p className="flex items-center gap-2">
                                        <FaUser className="text-slate-400" />
                                        <span className="font-medium">Buyer:</span> {p.buyerName || "—"}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaTag className="text-slate-400" />
                                        <span className="font-medium">Min Qty:</span> {p.minQty ?? p.quantity ?? 0}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    <Link to={`/dashboard/update-product/${p._id}`} className="btn btn-sm btn-outline w-full">
                                        <FaEdit /> Update
                                    </Link>
                                    <button onClick={() => handleDeleteProduct(p)} className="btn btn-sm btn-error text-white w-full">
                                        <FaTrashAlt /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- Desktop View: Table (>= 768px) --- */}
                    <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                        <table className="table table-sm w-full">
                            <thead className="bg-slate-50">
                                <tr className="text-xs text-slate-500 uppercase font-bold">
                                    <th className="py-4 pl-4">#</th>
                                    <th>Product</th>
                                    <th>Buyer</th>
                                    <th className="text-right">Min Qty</th>
                                    <th className="text-right">Price</th>
                                    <th className="text-center">Home Page</th>
                                    <th className="text-right pr-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs divide-y divide-slate-100">
                                {filteredProducts.map((p, idx) => (
                                    <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="pl-4 text-slate-400">{idx + 1}</td>
                                        <td>
                                            <p className="font-bold text-slate-800 text-[13px]">
                                                {p.name || "Unnamed product"}
                                            </p>
                                            {p.category && (
                                                <span className="badge badge-ghost badge-sm mt-1 text-[10px]">
                                                    {p.category}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-700">
                                                    {p.buyerName || "—"}
                                                </span>
                                                {p.buyerEmail && (
                                                    <span className="text-[10px] text-slate-400">
                                                        {p.buyerEmail}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="text-right font-medium text-slate-600">
                                            {p.minQty ?? p.quantity ?? 0}
                                        </td>
                                        <td className="text-right font-bold text-blue-600">
                                            {p.price ? `$${p.price}` : "On request"}
                                        </td>
                                        <td className="text-center">
                                            <span className={`badge badge-xs font-medium py-2 px-3 ${p.showOnHome ? "bg-emerald-100 text-emerald-700 border-none" : "bg-slate-100 text-slate-500 border-none"}`}>
                                                {p.showOnHome ? "Yes" : "No"}
                                            </span>
                                        </td>
                                        <td className="text-right pr-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    to={`/dashboard/update-product/${p._id}`}
                                                    className="btn btn-xs btn-square btn-ghost text-blue-600 hover:bg-blue-50"
                                                    title="Update"
                                                >
                                                    <FaEdit className="text-base" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteProduct(p)}
                                                    className="btn btn-xs btn-square btn-ghost text-red-500 hover:bg-red-50"
                                                    title="Delete"
                                                >
                                                    <FaTrashAlt className="text-base" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default ManageProducts;
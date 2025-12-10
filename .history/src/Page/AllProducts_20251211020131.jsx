import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hook /useAxiosSecure";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    // UI controls
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("none");

    // Load products from backend
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axiosSecure.get("/products");

                // ✅ ফিক্স: সরাসরি res.data না নিয়ে, res.data.products নিতে হবে
                // সার্ভার এখন { products: [], total: ... } পাঠাচ্ছে
                setProducts(res.data.products || []);

            } catch (err) {
                console.error("Error loading products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [axiosSecure]);

    // Filter + search + sort (client side)
    const filteredProducts = products
        .filter((p) =>
            category === "all" ? true : (p.category || "").toLowerCase() === category
        )
        .filter((p) =>
            search
                ? (p.name || "")
                    .toLowerCase()
                    .includes(search.trim().toLowerCase())
                : true
        );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sort === "priceLow") {
            return (a.price || 0) - (b.price || 0);
        }
        if (sort === "priceHigh") {
            return (b.price || 0) - (a.price || 0);
        }
        return 0; // "none" হলে original order
    });

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Helmet>
                <title>All Products | Garments Tracker</title>
            </Helmet>

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                        Products
                    </p>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                        All Garments Products
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Browse all items that are currently registered in the system.
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap gap-3 text-sm">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by product name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-48 md:w-64 rounded-full border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                        />
                    </div>

                    {/* Category filter (static options for now) */}
                    <select
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-sm outline-none bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="all">All categories</option>
                        <option value="t-shirt">T-Shirt</option>
                        <option value="hoodie">Hoodie</option>
                        <option value="denim">Denim</option>
                        <option value="others">Others</option>
                    </select>

                    {/* Sort */}
                    <select
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-sm outline-none bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="none">Sort: Default</option>
                        <option value="priceLow">Price: Low to High</option>
                        <option value="priceHigh">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* INFO BADGE */}
            <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-2 text-xs text-blue-800 flex items-center justify-between">
                <p>
                    Total products loaded:{" "}
                    <span className="font-semibold">{sortedProducts.length}</span>
                </p>
                <p className="hidden sm:block">
                    Later you can connect this grid with manager / admin actions (edit,
                    delete, approve etc.).
                </p>
            </div>

            {/* PRODUCTS GRID */}
            {sortedProducts.length === 0 ? (
                <div className="min-h-[40vh] flex flex-col items-center justify-center text-center text-slate-500">
                    <p className="text-sm font-medium">No products found</p>
                    <p className="text-xs mt-1">
                        Try clearing filters or add products from the dashboard.
                    </p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                        >
                            {/* Image */}
                            <div className="h-40 bg-slate-100 overflow-hidden">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[11px] text-slate-400">
                                        No image provided
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-3 flex flex-col gap-2 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="font-semibold text-sm text-slate-900">
                                            {product.name || "Unnamed product"}
                                        </h3>
                                        <p className="text-[11px] text-slate-500">
                                            Buyer:{" "}
                                            <span className="font-medium">
                                                {product.buyerName || "N/A"}
                                            </span>
                                        </p>
                                    </div>

                                    {product.status && (
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                                            {product.status}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between text-xs text-slate-500">
                                    <p>
                                        Min Qty:{" "}
                                        <span className="font-semibold text-slate-800">
                                            {product.minQty || product.quantity || 0}
                                        </span>
                                    </p>
                                    <p>
                                        Price:{" "}
                                        <span className="font-semibold text-blue-600">
                                            {product.price ? `$${product.price}` : "On request"}
                                        </span>
                                    </p>
                                </div>

                                {product.category && (
                                    <p className="text-[11px] text-slate-400">
                                        Category: {product.category}
                                    </p>
                                )}

                                {/* Footer */}
                                <div className="pt-2 flex items-center justify-between text-[11px]">
                                    {/* 🔹 View Details button – product details page e niye jabe */}
                                    <Link
                                        to={`/products/${product._id}`}
                                        className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition-colors"
                                    >
                                        View details
                                    </Link>

                                    {/* ছোট info + future tracking */}
                                    <div className="text-right">
                                        <Link
                                            to="/dashboard/track-order"
                                            className="text-blue-600 hover:text-blue-700 font-medium block"
                                        >
                                            Track orders →
                                        </Link>
                                        <span className="text-slate-400 block">
                                            ID: {product.orderId || product._id?.slice(-6)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllProducts;

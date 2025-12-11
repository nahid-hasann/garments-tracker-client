import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hook /useAxiosSecure"; // আপনার ফোল্ডার পাথ ঠিক রাখুন

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination & Filter States
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1); // বর্তমান পেজ
    const [totalPages, setTotalPages] = useState(1);   // মোট পেজ কতগুলো
    const limit = 9; // প্রতি পেজে ৯টা করে দেখাবে

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // সার্ভারে page, limit, search, category পাঠাচ্ছি
                const res = await axiosSecure.get(
                    `/products?page=${currentPage}&limit=${limit}&search=${search}&category=${category}`
                );

                // সার্ভার এখন ২টা জিনিস পাঠাচ্ছে: { products: [...], total: 100 }
                // ১. প্রোডাক্ট লিস্ট
                setProducts(res.data.products || []);

                // ২. টোটাল আইটেম সংখ্যা দিয়ে পেজ সংখ্যা বের করছি
                const totalItems = res.data.total || 0;
                setTotalPages(Math.ceil(totalItems / limit));

            } catch (err) {
                console.error("Error loading products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage, search, category, axiosSecure]); // এগুলোর ভ্যালু চেঞ্জ হলে ডাটা আবার লোড হবে

    // পেজ চেঞ্জ করার ফাংশন
    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

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

            {/* HEADER & FILTERS */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                        All Garments Products
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Browse all items registered in the system.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search product..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1); // সার্চ করলে ১ নম্বর পেজে ফেরত যাবে
                        }}
                        className="w-48 md:w-64 rounded-full border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-blue-500"
                    />

                    {/* Category */}
                    <select
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-sm outline-none bg-white focus:border-blue-500"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setCurrentPage(1); // ক্যাটাগরি বদলালে ১ নম্বর পেজে যাবে
                        }}
                    >
                        <option value="all">All categories</option>
                        <option value="t-shirt">T-Shirt</option>
                        <option value="hoodie">Hoodie</option>
                        <option value="denim">Denim</option>
                        <option value="others">Others</option>
                    </select>
                </div>
            </div>

            {/* PRODUCTS GRID */}
            {products.length === 0 ? (
                <div className="min-h-[40vh] flex flex-col items-center justify-center text-center text-slate-500">
                    <p className="text-sm font-medium">No products found</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                        >
                            {/* Image */}
                            <div className="h-40 bg-slate-100 overflow-hidden">
                                <img
                                    src={product.image || "https://via.placeholder.com/150"}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-3 flex flex-col gap-2 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-semibold text-sm text-slate-900">
                                        {product.name}
                                    </h3>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                                        {product.category}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-xs text-slate-500">
                                    <p>Min Qty: <span className="font-bold">{product.minQty || 0}</span></p>
                                    <p className="font-bold text-blue-600">${product.price}</p>
                                </div>

                                <div className="pt-2 mt-auto">
                                    <Link
                                        to={`/products/${product._id}`}
                                        className="block text-center w-full px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition-colors text-xs"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ====== PAGINATION CONTROLS (বাটনগুলো) ====== */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8 mb-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="btn btn-sm btn-outline"
                    >
                        Prev
                    </button>

                    {/* Page Numbers: [1, 2, 3...] */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`btn btn-sm ${currentPage === page ? "btn-primary" : "btn-ghost"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="btn btn-sm btn-outline"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllProducts;
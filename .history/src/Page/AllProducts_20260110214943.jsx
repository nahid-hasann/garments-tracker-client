import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hook /useAxiosSecure"; 
import SkeletonCard from "../component/SkeletonCard";
import { FaFilter, FaUndo, FaSortAmountDown } from "react-icons/fa";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    // --- Filter States ---
    const [search, setSearch] = useState("");
    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState(""); // asc, desc
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // --- Pagination States ---
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 9;

    // Search Debounce Effect
    useEffect(() => {
        const delaySearch = setTimeout(() => {
            setSearch(searchText);
            setCurrentPage(1);
        }, 800);
        return () => clearTimeout(delaySearch);
    }, [searchText]);

    // Fetch Products with Filters & Sort
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                
                const queryParams = new URLSearchParams({
                    page: currentPage,
                    limit: limit,
                    search: search,
                    category: category !== "all" ? category : "",
                    sort: sort,
                    minPrice: minPrice,
                    maxPrice: maxPrice
                }).toString();

                const res = await axiosSecure.get(`/products?${queryParams}`);

                setProducts(res.data.products || []);
                const totalItems = res.data.total || 0;
                setTotalPages(Math.ceil(totalItems / limit));

            } catch (err) {
                console.error("Error loading products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage, search, category, sort, minPrice, maxPrice, axiosSecure]);

    // Handle Pagination
    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // Reset All Filters
    const handleReset = () => {
        setSearchText("");
        setCategory("");
        setSort("");
        setMinPrice("");
        setMaxPrice("");
        setCurrentPage(1);
    };

    return (
        <div className="space-y-8 pb-10">
            <Helmet>
                <title>All Products | Garments Tracker</title>
            </Helmet>

            {/* --- Filter & Header Section --- */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Garments Collection</h1>
                        <p className="text-sm text-slate-500">Browse and filter production items.</p>
                    </div>

                    {/* Reset Button */}
                    <button onClick={handleReset} className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50 gap-2">
                        <FaUndo className="text-xs" /> Reset Filters
                    </button>
                </div>

                <div className="divider my-0"></div>

                {/* Filters Grid */}
                <div className="flex flex-wrap items-center gap-3">

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="input input-sm input-bordered rounded-full w-full sm:w-48 bg-slate-50"
                    />

                    {/* Category */}
                    <select
                        className="select select-sm select-bordered rounded-full w-full sm:w-40 bg-slate-50"
                        value={category}
                        onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">All Categories</option>
                        <option value="t-shirt">T-Shirt</option>
                        <option value="hoodie">Hoodie</option>
                        <option value="denim">Denim</option>
                        <option value="jacket">Jacket</option>
                        <option value="shirt">Shirt</option>
                        <option value="others">Others</option>
                    </select>

                    {/* Sort By Price */}
                    <div className="relative">
                        <FaSortAmountDown className="absolute left-3 top-2.5 text-slate-400 text-xs" />
                        <select
                            className="select select-sm select-bordered rounded-full w-full sm:w-48 pl-8 bg-slate-50"
                            value={sort}
                            onChange={(e) => { setSort(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="">Sort by: Default</option>
                            <option value="asc">Price: Low to High</option>
                            <option value="desc">Price: High to Low</option>
                        </select>
                    </div>

                    {/* Price Range */}
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Min $"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="input input-sm input-bordered rounded-full w-20 bg-slate-50"
                        />
                        <span className="text-slate-400">-</span>
                        <input
                            type="number"
                            placeholder="Max $"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="input input-sm input-bordered rounded-full w-20 bg-slate-50"
                        />
                    </div>
                </div>
            </div>

            {/* --- Product Grid with Skeleton --- */}
            {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(9)].map((_, index) => <SkeletonCard key={index} />)}
                </div>
            ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh] bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <div className="text-4xl text-slate-300 mb-3"><FaFilter /></div>
                    <p className="text-slate-500 font-medium">No products found matching your filters.</p>
                    <button onClick={handleReset} className="mt-3 btn btn-sm btn-link">Clear all filters</button>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group">

                            {/* Image */}
                            <div className="h-56 bg-slate-100 overflow-hidden relative">
                                {product.image ? (
                                    <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No Image</div>
                                )}
                                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 text-[10px] font-bold rounded shadow-sm text-slate-700">
                                    {product.category || 'Item'}
                                </span>
                            </div>

                            {/* Details */}
                            <div className="p-4 flex flex-col gap-2 flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-slate-900 line-clamp-1" title={product.name}>{product.name}</h3>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-500">
                                    <p>Min: <span className="font-bold">{product.minQty || 0}</span></p>
                                    <p className="font-bold text-blue-600">${product.price}</p>
                                </div>

                                <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-50">
                                    <Link to={`/products/${product._id}`} className="block text-center w-full px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-colors">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* --- Pagination --- */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button onClick={handlePrev} disabled={currentPage === 1} className="btn btn-sm btn-outline border-slate-200">Previous</button>
                    <div className="join">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`join-item btn btn-sm ${currentPage === page ? "btn-primary" : "btn-ghost bg-white"}`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button onClick={handleNext} disabled={currentPage === totalPages} className="btn btn-sm btn-outline border-slate-200">Next</button>
                </div>
            )}
        </div>
    );
};

export default AllProducts;
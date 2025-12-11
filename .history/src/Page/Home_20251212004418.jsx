import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaClipboardList, FaCut, FaCheckDouble, FaShippingFast } from "react-icons/fa";

const Home = () => {

 

    const [homeProducts, setHomeProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/products/home?limit=6")
            .then(res => res.json())
            .then(data => setHomeProducts(data))
    }, [])

    return (
      
        <div className="space-y-10">
            <Helmet>
                <title>Home | Garments Tracker</title>
            </Helmet>
            {/* ========== HERO SECTION ========== */}
            <section className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl px-6 py-10 md:px-10 md:py-14 text-white shadow-md">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Text */}
                    <div className="space-y-4">
                        <p className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs uppercase tracking-wide">
                            Garments Order & Production Tracker
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                            Manage Your Garments Orders & Production in One Smart Dashboard.
                        </h1>
                        <p className="text-sm md:text-base text-blue-100">
                            Track buyer orders, production stages, inventory & delivery status
                            in real time. Built for small & medium sized garments factories.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-2">
                            <Link
                                to="/all-products"
                                className="px-5 py-2.5 rounded-full bg-white text-blue-700 text-sm font-semibold hover:bg-slate-100 transition-colors shadow-sm"
                            >
                                View Products
                            </Link>
                            <Link
                                to="/dashboard"
                                className="px-5 py-2.5 rounded-full border border-white/60 text-sm font-semibold hover:bg-white/10 transition-colors"
                            >
                                Go to Dashboard
                            </Link>
                        </div>

                        <div className="flex gap-6 pt-4 text-xs text-blue-100">
                            <div>
                                <p className="font-semibold text-white text-sm">
                                    24/7 Monitoring
                                </p>
                                <p>Order, cutting, sewing, finishing – everything in control.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-white text-sm">Role Based</p>
                                <p>Admin, Manager & Buyer dashboards with clear permissions.</p>
                            </div>
                        </div>
                    </div>

                    {/* Image / Illustration */}
                    <div className="hidden md:flex justify-end">
                        <div className="bg-white/10 rounded-2xl p-4 w-full max-w-sm backdrop-blur border border-white/20 shadow-xl">
                            <p className="text-xs text-blue-100 mb-2">Production Snapshot</p>
                            <div className="bg-white rounded-xl p-4 text-slate-900 space-y-3">
                                <div className="flex justify-between text-xs text-slate-500">
                                    <span>Today&apos;s Orders</span>
                                    <span>15</span>
                                </div>
                                <div className="flex justify-between text-xs text-slate-500">
                                    <span>In Production</span>
                                    <span>38</span>
                                </div>
                                <div className="flex justify-between text-xs text-slate-500">
                                    <span>Ready to Ship</span>
                                    <span>7</span>
                                </div>

                                <div className="mt-3">
                                    <p className="text-xs font-semibold mb-1">
                                        Line Performance
                                    </p>
                                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                                    </div>
                                    <p className="text-[11px] text-slate-500 mt-1">
                                        75% of today&apos;s production target completed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== OUR PRODUCTS (STATIC UI, ৬টা কার্ড) ========== */}
            {/* TODO: Later replace static cards with MongoDB data (limit 6) */}
            <section className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                            Our Products
                        </h2>
                        <p className="text-xs md:text-sm text-slate-500">
                            Featured garments items from your production lines.
                        </p>
                    </div>
                    <Link
                        to="/all-products"
                        className="text-xs md:text-sm text-blue-600 hover:text-blue-700"
                    >
                        View all
                    </Link>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* 6 static cards – later API দিয়ে আসবে */}
                    {homeProducts.length === 0 ? (
                        <p className="text-sm text-slate-500">No featured products selected yet.</p>
                    ) : (
                        homeProducts.map(product => (
                            <div key={product._id} className="bg-white rounded-xl shadow-sm border p-3">
                                <div className="h-32 bg-slate-100 overflow-hidden">
                                    {product.image ? (
                                        <img src={product.image} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center text-xs text-slate-400">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                <div className="mt-2 space-y-1">
                                    <h3 className="font-semibold text-sm">{product.name}</h3>
                                    <p className="text-[12px] text-slate-500">{product.buyerName}</p>

                                    <div className="flex justify-between text-xs pt-2">
                                        <span className="font-semibold text-blue-600">${product.price}</span>
                                        <Link
                                            to={`/products/${product._id}`}
                                            className="text-blue-600 hover:text-blue-700"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                </div>
            </section>

            {/* ========== HOW IT WORKS ========== */}
            <section className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 md:p-12 space-y-10 overflow-hidden relative">
                {/* Decorative Background Blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2"></div>

                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h2 className="text-3xl font-bold text-slate-900">
                        How It Works
                    </h2>
                    <p className="text-slate-500 text-lg">
                        From buyer order to final shipment – track every step in a seamless workflow.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-slate-100 -z-10"></div>

                    {/* === STEP 1 === */}
                    <div className="relative group">
                        <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                            <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <FaClipboardList />
                            </div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                <span className="badge badge-primary badge-outline text-xs font-bold">Step 01</span>
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mb-2">Order Created</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Admin adds new order with quantities, size ratio & estimated ship date.
                            </p>
                        </div>
                    </div>

                    {/* === STEP 2 === */}
                    <div className="relative group">
                        <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                            <div className="w-16 h-16 mx-auto bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <FaCut />
                            </div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                <span className="badge badge-secondary badge-outline text-xs font-bold">Step 02</span>
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mb-2">Cutting & Sewing</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Production team updates real-time progress for cutting, sewing & finishing lines.
                            </p>
                        </div>
                    </div>

                    {/* === STEP 3 === */}
                    <div className="relative group">
                        <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                            <div className="w-16 h-16 mx-auto bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <FaCheckDouble />
                            </div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                <span className="badge badge-accent badge-outline text-xs font-bold">Step 03</span>
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mb-2">QC & Packing</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Quality team logs pass/fail status and prepares the final packing list.
                            </p>
                        </div>
                    </div>

                    {/* === STEP 4 === */}
                    <div className="relative group">
                        <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                            <div className="w-16 h-16 mx-auto bg-orange-50 text-orange-600 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                <FaShippingFast />
                            </div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                <span className="badge badge-warning badge-outline text-xs font-bold">Step 04</span>
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mb-2">Shipment</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Handover to logistics. Buyer tracks shipment status directly from dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== CUSTOMER FEEDBACK ========== */}
          <

            {/* ========== EXTRA SECTION 1: WHY CHOOSE US ========== */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6 space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">
                    Why GarmentsTracker?
                </h2>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-slate-50 rounded-xl p-4">
                        <p className="font-semibold text-slate-900">
                            Role-based Dashboard
                        </p>
                        <p className="text-[12px] text-slate-500 mt-1">
                            Separate, clear dashboards for admin, manager and buyer roles.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                        <p className="font-semibold text-slate-900">
                            Real-time Insights
                        </p>
                        <p className="text-[12px] text-slate-500 mt-1">
                            Line-wise production, order status and shipment progress in one
                            place.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                        <p className="font-semibold text-slate-900">
                            Simple & Factory Friendly
                        </p>
                        <p className="text-[12px] text-slate-500 mt-1">
                            Lightweight web app designed for small and medium garments
                            factories.
                        </p>
                    </div>
                </div>
            </section>

            {/* ========== EXTRA SECTION 2: PRODUCTION SNAPSHOT CARDS ========== */}
            <section className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                    <p className="text-xs text-slate-500">Today&apos;s Orders</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">18</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                        Total buyer orders loaded into today&apos;s production plan.
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                    <p className="text-xs text-slate-500">In Production</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">42</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                        Orders currently in cutting, sewing or finishing lines.
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                    <p className="text-xs text-slate-500">Ready to Ship</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-1">9</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                        QC passed & packed, shipments waiting for final booking.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;

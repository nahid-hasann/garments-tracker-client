import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
    

    return (
        <div className="space-y-10">
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
                            in real time. Built for small & medium size garments factories.
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
                                <p>Admin, Manager & Buyer dashboard with clear permissions.</p>
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
            <section className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                            Our Products
                        </h2>
                        <p className="text-xs md:text-sm text-slate-500">
                            Featured garments items from your factory. (Later: MongoDB data)
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
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="h-32 bg-slate-200">
                                {/* ইমেজ হলে এখানে <img /> বসবে পরে */}
                            </div>
                            <div className="p-3 space-y-1">
                                <h3 className="font-semibold text-sm text-slate-900">
                                    Sample Product {idx + 1}
                                </h3>
                                <p className="text-[12px] text-slate-500">
                                    Short description of the garments item. (Shirt / Hoodie /
                                    Denim etc.)
                                </p>
                                <div className="flex justify-between items-center pt-1">
                                    <span className="text-sm font-semibold text-blue-600">
                                        $12.00
                                    </span>
                                    <Link
                                        to="/all-products"
                                        className="text-[11px] text-blue-600 hover:text-blue-700"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ========== HOW IT WORKS ========== */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6 space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">
                    How It Works
                </h2>
                <p className="text-sm text-slate-500 max-w-xl">
                    From buyer order to final shipment – track every step in a clean,
                    visual workflow.
                </p>

                <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-xs font-semibold text-blue-600 mb-1">
                            Step 1
                        </p>
                        <p className="font-semibold text-slate-900">
                            Buyer Order Created
                        </p>
                        <p className="text-[12px] text-slate-500 mt-1">
                            Admin/Manager adds new order with quantities, size ratio & ship
                            date.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-xs font-semibold text-blue-600 mb-1">
                            Step 2
                        </p>
                        <p className="font-semibold text-slate-900">
                            Cutting & Sewing
                        </p>
                        <p className="text-[12px] text-slate-500 mt-1">
                            Production team updates progress by line: cutting, sewing,
                            finishing.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-xs font-semibold text-blue-600 mb-1">
                            Step 3
                        </p>
                        <p className="font-semibold text-slate-900">
                            QC & Packing
                        </p>
                        <p className="text-[12px] text-slate-500 mt-1">
                            Quality team logs pass/fail status & packing details.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-xs font-semibold text-blue-600 mb-1">
                            Step 4
                        </p>
                        <p className="font-semibold text-slate-900">
                            Shipment & Tracking
                        </p>
                        <p className="text-[12px] text-slate-500 mt-1">
                            Buyer can track shipment status & order history from dashboard.
                        </p>
                    </div>
                </div>
            </section>

            {/* ========== CUSTOMER FEEDBACK ========== */}
            <section className="space-y-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Customer Feedback
                    </h2>
                    <p className="text-xs text-slate-500">
                        Static UI – later carousel বানাবো।
                    </p>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2">
                    {/* 3 feedback card */}
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="min-w-[230px] bg-white rounded-xl border border-slate-100 shadow-sm p-4 text-sm"
                        >
                            <p className="text-[12px] text-slate-500 mb-2">
                                &quot;Production tracker use kore amra eta easily bujhte
                                parchi kon order kon stage-e. On-time shipment barse.&quot;
                            </p>
                            <p className="font-semibold text-slate-900 text-sm">
                                Buyer {item}
                            </p>
                            <p className="text-[11px] text-slate-400">
                                Knitwear Export, Dhaka
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ========== EXTRA SECTION 1: WHY CHOOSE US ========== */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6 space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">
                    Why GarmentsTracker?
                </h2>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-slate-50 rounded-xl p-4">
                        <p className="font-semibold text-slate-900">
                            Role Based Dashboard
                        </p>
                        <p className="text-[12px] text-slate-500 mt-1">
                            Admin, manager & buyer – sobar jonno alada clear dashboard.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                        <p className="font-semibold text-slate-900">
                            Real Time Insights
                        </p>
                        <p className="text-[12px] text-slate-500 mt-1">
                            Line wise production, order status & shipment progress ek jaygay.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                        <p className="font-semibold text-slate-900">
                            Simple & Factory Friendly
                        </p>
                        <p className="text-[12px] text-slate-500 mt-1">
                            Complex ERP na, lightweight web app – small factories er jonno.
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
                        Total buyer orders loaded into today&apos;s plan.
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
                        QC passed & packed, shipment waiting for final booking.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FaBoxes, FaChartLine, FaTruckLoading } from "react-icons/fa";

const About = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Helmet>
                <title>About Us | Garments Tracker</title>
            </Helmet>

            
            <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
                <div className="flex flex-col md:flex-row items-center gap-12">
                  
                    <div className="flex-1 space-y-6 animate-fade-in-up">
                        <div className="badge badge-primary badge-outline">Our Story</div>
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                            Revolutionizing Garment <br />
                            <span className="text-blue-600">Production Tracking</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Garments Tracker is designed to simplify the complex process of
                            apparel manufacturing. We bridge the gap between managers, buyers,
                            and production lines, ensuring transparency and efficiency at every
                            stitch.
                        </p>
                        <div className="pt-4">
                            <Link to="/contact" className="btn btn-primary px-8 rounded-full">
                                Get in Touch
                            </Link>
                        </div>
                    </div>

                 
                    <div className="flex-1 animate-fade-in">
                        <img
                            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Garment production line"
                            className="rounded-2xl shadow-xl border border-slate-200 w-full object-cover h-[400px]"
                        />
                    </div>
                </div>
            </div>

          
            <div className="bg-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                        Our Mission
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Our mission is to empower garment factories with digital tools that
                        eliminate manual paperwork, reduce errors, and provide real-time
                        insights into order status. We believe in a future where tracking
                        bulk orders is as easy as tracking a personal parcel.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                        What We Bring to the Table
                    </h2>
                    <p className="text-slate-500 mt-2">
                        Key features that make production seamless.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature Card 1 */}
                    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-all group">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                            <FaBoxes />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                            Inventory Management
                        </h3>
                        <p className="text-slate-500 leading-relaxed">
                            Effortlessly manage products, track available quantities, and set
                            minimum order limits for buyers.
                        </p>
                    </div>

                    {/* Feature Card 2 */}
                    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-all group">
                        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                            <FaTruckLoading />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                            Real-time Order Tracking
                        </h3>
                        <p className="text-slate-500 leading-relaxed">
                            Buyers can track their order status from "Pending" to "Approved"
                            and production stages in real-time.
                        </p>
                    </div>

                    {/* Feature Card 3 */}
                    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-all group">
                        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                            <FaChartLine />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                            Secure Role-Based Access
                        </h3>
                        <p className="text-slate-500 leading-relaxed">
                            Dedicated panels for Admins, Managers, and Buyers to ensure data
                            security and proper workflow.
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= CTA SECTION ================= */}
            <div className="bg-blue-600 py-16 text-center px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                    Ready to streamline your production?
                </h2>
                <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                    Join us today and experience the easiest way to manage your garment factory operations.
                </p>
                <div className="flex gap-4 justify-center">
                    {/* যদি ইউজার লগইন করা না থাকে তবে রেজিস্টার বাটন দেখাবেন, থাকলে ড্যাশবোর্ড */}
                    <Link to="/register" className="btn btn-white text-blue-600 hover:bg-blue-50 rounded-full px-8 border-none">
                        Create Account
                    </Link>
                    <Link to="/all-products" className="btn btn-outline text-white hover:bg-blue-700 hover:border-blue-700 rounded-full px-8">
                        Explore Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;
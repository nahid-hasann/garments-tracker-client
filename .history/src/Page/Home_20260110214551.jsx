import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaClipboardList, FaCut, FaCheckDouble, FaShippingFast, FaUserShield, FaChartLine, FaIndustry, FaCogs, FaBoxOpen } from "react-icons/fa";
import FeedbackSection from "../component/FeedbackSection";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import BrandsSection from "../component/BrandsSection";
import TeamSection from "../component/TeamSection";
import FaqSection from "../component/FaqSection";
import Newsletter from "../component/Newsletter";
import useAxiosSecure from "../Hook /useAxiosSecure";
import SkeletonCard from "../component/SkeletonCard";

const Home = () => {
    const axiosSecure = useAxiosSecure();

    const { data: homeProducts = [],  isLoading } = useQuery({
        queryKey: ['homeProducts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products?limit=6&page=1');
            return res.data.products || res.data;
        }
    });


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        
        <div className="space-y-16 pb-10">
            <Helmet>
                <title>Home | Garments Tracker</title>
            </Helmet>

            {/* --- Hero Section --- */}
            {/* --- Hero Section (Updated) --- */}
            {/* Requirement: Height 60-70% of screen & Clear Visual Flow */}
            <section className="relative bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl overflow-hidden shadow-2xl min-h-[70vh] flex items-center">

                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                <div className="relative z-10 w-full px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10 text-white">
                                Garments Order & Production Tracker
                            </p>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white"
                        >
                            Manage Orders & <br /> <span className="text-blue-200">Production Live.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="text-lg text-blue-50 leading-relaxed max-w-lg"
                        >
                            Track buyer orders, production stages, inventory & delivery status
                            in real time. Built for smart factories.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="flex flex-wrap gap-4 pt-2"
                        >
                            {/* CTA Button */}
                            <Link
                                to="/all-products"
                                className="px-8 py-3.5 rounded-full bg-white text-blue-700 font-bold hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                Explore Products
                            </Link>
                            <Link
                                to="/dashboard"
                                className="px-8 py-3.5 rounded-full border border-white/40 font-bold text-white hover:bg-white/10 transition-all"
                            >
                                Dashboard
                            </Link>
                        </motion.div>
                    </div>

                    {/* Hero Stats Card with Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="hidden md:flex justify-end"
                    >
                        <div className="bg-white/10 rounded-3xl p-6 w-full max-w-sm backdrop-blur-md border border-white/20 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-xs font-bold text-blue-100 uppercase tracking-widest">Live Status</p>
                                <div className="badge badge-success badge-xs animate-pulse"></div>
                            </div>

                            <div className="bg-white rounded-2xl p-5 text-slate-900 space-y-4 shadow-inner">
                                <div className="flex justify-between text-sm font-medium text-slate-600 border-b border-slate-100 pb-2">
                                    <span>Today's Orders</span>
                                    <span className="text-slate-900 font-bold">15</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-slate-600 border-b border-slate-100 pb-2">
                                    <span>In Production</span>
                                    <span className="text-slate-900 font-bold">38</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-slate-600">
                                    <span>Ready to Ship</span>
                                    <span className="text-slate-900 font-bold">7</span>
                                </div>

                                <div className="mt-4 pt-2 bg-slate-50 p-3 rounded-xl">
                                    <div className="flex justify-between items-end mb-2">
                                        <p className="text-xs font-bold text-slate-500">Efficiency</p>
                                        <p className="text-xs font-bold text-blue-600">94%</p>
                                    </div>
                                    <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full w-[94%] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Requirement: Visual flow to next section (Scroll Down Indicator) */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-2">
                        <div className="w-1 h-3 bg-white/60 rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* --- Brands Section (New) --- */}
            <BrandsSection />

            {/* --- Featured Products --- */}
            <section className="space-y-6">
                {/* 1. Header Part */}
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                            Featured Collection
                        </h2>
                        <p className="text-slate-500 mt-1">
                            Top production items trending this week.
                        </p>
                    </div>
                    <Link
                        to="/all-products"
                        className="btn btn-outline btn-sm rounded-full px-6"
                    >
                        View All
                    </Link>
                </div>

                {/* 2. Product Grid Part (With Skeleton Logic) */}
                {isLoading ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {/* ৬টা স্কেলিটন কার্ড */}
                        {[...Array(6)].map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
                    >
                        {homeProducts.length === 0 ? (
                            <div className="col-span-3 text-center py-10 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                No products found.
                            </div>
                        ) : (
                            homeProducts.map(product => (
                                <motion.div
                                    key={product._id}
                                    variants={cardVariants}
                                    className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                                >
                                    <div className="h-56 bg-slate-100 overflow-hidden relative">
                                        {product.image ? (
                                            <img src={product.image} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-slate-400">No Image</div>
                                        )}
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                                            {product.category || 'Apparel'}
                                        </div>
                                    </div>

                                    <div className="p-5 space-y-3">
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg line-clamp-1">{product.name}</h3>
                                            <p className="text-sm text-slate-500">{product.buyerName}</p>
                                        </div>

                                        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                            <span className="text-xl font-bold text-blue-600">${product.price}</span>
                                            <Link
                                                to={`/products/${product._id}`}
                                                className="text-sm font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1"
                                            >
                                                Details →
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                )}
            </section>

            {/* --- How It Works --- */}
            {/* CHANGE 2: Removed mt-[70px] to keep spacing consistent */}
            <section className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-16 space-y-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 -z-10 translate-x-1/3 -translate-y-1/3"></div>

                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">Workflow</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                        From Order to Shipment
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Track every step seamlessly. Our system ensures transparency at every stage of production.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6 relative">
                    <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-emerald-200 -z-10"></div>

                    {/* Step 1 */}
                    <div className="relative group text-center">
                        <div className="w-20 h-20 mx-auto bg-white border-2 border-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:border-blue-500 group-hover:scale-110 transition-all duration-300 relative z-10">
                            <FaClipboardList />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">1. Order</h3>
                        <p className="text-sm text-slate-500 px-2">Admin/Buyer places order with specs.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative group text-center">
                        <div className="w-20 h-20 mx-auto bg-white border-2 border-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:border-indigo-500 group-hover:scale-110 transition-all duration-300 relative z-10">
                            <FaCut />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">2. Production</h3>
                        <p className="text-sm text-slate-500 px-2">Cutting, Sewing & Finishing updates.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative group text-center">
                        <div className="w-20 h-20 mx-auto bg-white border-2 border-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:border-emerald-500 group-hover:scale-110 transition-all duration-300 relative z-10">
                            <FaCheckDouble />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">3. QC Check</h3>
                        <p className="text-sm text-slate-500 px-2">Quality assurance & final packing.</p>
                    </div>

                    {/* Step 4 */}
                    <div className="relative group text-center">
                        <div className="w-20 h-20 mx-auto bg-white border-2 border-orange-100 text-orange-600 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:border-orange-500 group-hover:scale-110 transition-all duration-300 relative z-10">
                            <FaShippingFast />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">4. Delivery</h3>
                        <p className="text-sm text-slate-500 px-2">Handover to logistics & tracking.</p>
                    </div>
                </div>
            </section>

            {/* --- Feedback Section --- */}
            <FeedbackSection />

            {/* --- Why Choose Us --- */}
            <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-16 space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Why Factories Love <span className="text-blue-400">GarmentsTracker?</span>
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Designed to solve real-world problems in the apparel manufacturing industry.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition duration-300">
                        <FaUserShield className="text-4xl text-blue-400 mb-4" />
                        <h3 className="text-xl font-bold mb-3">Role-based Security</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Strict access control for Admins, Managers, and Buyers ensuring data privacy.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition duration-300">
                        <FaChartLine className="text-4xl text-emerald-400 mb-4" />
                        <h3 className="text-xl font-bold mb-3">Instant Reporting</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Generate production status reports instantly without manual excel sheets.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition duration-300">
                        <FaIndustry className="text-4xl text-violet-400 mb-4" />
                        <h3 className="text-xl font-bold mb-3">Factory Optimized</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Lightweight and works smoothly even on low-bandwidth factory internet.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- Team & FAQ (New) --- */}
            <TeamSection />
            <FaqSection />

            {/* --- Bottom Stats Cards --- */}
            {/* CHANGE 3: Removed px-2 to align with other sections */}
            <section className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm font-bold text-blue-600 uppercase">New Orders</p>
                        <h3 className="text-4xl font-bold text-slate-900 mt-2">18</h3>
                        <p className="text-xs text-slate-500 mt-1">Received Today</p>
                    </div>
                    <div className="text-5xl text-blue-200">
                        <FaClipboardList />
                    </div>
                </div>

                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm font-bold text-amber-600 uppercase">Production</p>
                        <h3 className="text-4xl font-bold text-slate-900 mt-2">42</h3>
                        <p className="text-xs text-slate-500 mt-1">Lines Active</p>
                    </div>
                    <div className="text-5xl text-amber-200">
                        <FaCogs />
                    </div>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm font-bold text-emerald-600 uppercase">Dispatched</p>
                        <h3 className="text-4xl font-bold text-slate-900 mt-2">09</h3>
                        <p className="text-xs text-slate-500 mt-1">Shipments Today</p>
                    </div>
                    <div className="text-5xl text-emerald-200">
                        <FaBoxOpen />
                    </div>
                </div>
            </section>

            {/* --- Newsletter (New) --- */}
            <Newsletter />
        </div>
    );
};

export default Home;
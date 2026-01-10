import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaClipboardList, FaCut, FaCheckDouble, FaShippingFast, FaUserShield, FaChartLine, FaIndustry, FaCogs, FaBoxOpen } from "react-icons/fa";
import FeedbackSection from "../component/FeedbackSection";
import { motion } from "framer-motion";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import BrandsSection from "../component/BrandsSection";
import TeamSection from "../component/TeamSection";
import FaqSection from "../component/FaqSection";
import Newsletter from "../component/Newsletter";

const Home = () => {
    const axiosSecure = useAxiosSecure();

    const { data: homeProducts = [], isLoading } = useQuery({
        queryKey: ['homeProducts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products?limit=6&page=1');
            return res.data.products || res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

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
        // CHANGE 1: space-y-10 to space-y-16 for better breathing room
        <div className="space-y-16 pb-10">
            <Helmet>
                <title>Home | Garments Tracker</title>
            </Helmet>

            {/* --- Hero Section --- */}
            <section className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl px-6 py-10 md:px-12 md:py-20 text-white shadow-xl">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                        <p className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10">
                            Garments Order & Production Tracker
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                            Manage Orders & Production <br /> <span className="text-blue-100">In One Place.</span>
                        </h1>
                        <p className="text-lg text-blue-50 leading-relaxed max-w-lg">
                            Track buyer orders, production stages, inventory & delivery status
                            in real time. Built for smart factories.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link
                                to="/all-products"
                                className="px-8 py-3.5 rounded-full bg-white text-blue-700 font-bold hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                Explore Products
                            </Link>
                            <Link
                                to="/dashboard"
                                className="px-8 py-3.5 rounded-full border border-white/40 font-bold hover:bg-white/10 transition-all"
                            >
                                Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Hero Stats Card */}
                    <div className="hidden md:flex justify-end">
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
                    </div>
                </div>
            </section>

            {/* --- Brands Section (New) --- */}
            <BrandsSection />

            {/* --- Featured Products --- */}
            <section className="space-y-6">
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
                                        <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
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
                                            className="text-sm font-semibold text-slate-600 hover:text-blue-600 flex
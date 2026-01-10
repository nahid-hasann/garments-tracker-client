import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaUserCircle, FaYoutube, FaSignOutAlt } from 'react-icons/fa';
import useAuth from '../Hook /useAuth';

const MainLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logOut } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    // Sticky Navbar Shadow Effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logOut()
            .then(() => toast.success("Logged out successfully!"))
            .catch(() => toast.error("Logout failed"));
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">

            {/* --- HEADER / NAVBAR --- */}
            <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-slate-200 py-2' : 'bg-white py-4 border-slate-100'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-4">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                                <span className="text-white font-bold text-lg">GT</span>
                            </div>
                            <div className="leading-tight">
                                <p className="font-bold text-slate-900 text-xl tracking-tight">
                                    Garments<span className="text-blue-600">Tracker</span>
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                            <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600 transition-colors"}>Home</NavLink>
                            <NavLink to="/all-products" className={({ isActive }) => isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600 transition-colors"}>Products</NavLink>

                            {/* Dashboard Link Visible Directly in Navbar */}
                            {user && (
                                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-slate-600 hover:text-blue-600 transition-colors"}>
                                    Dashboard
                                </NavLink>
                            )}

                            <NavLink to="/about" className={({ isActive }) => isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600 transition-colors"}>About</NavLink>
                            <NavLink to="/contact" className={({ isActive }) => isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600 transition-colors"}>Contact</NavLink>
                        </nav>

                        {/* Right Side (Auth Buttons / Profile) - UPDATED HERE */}
                        <div className="hidden md:flex items-center gap-4 text-sm">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    {/* Profile Picture (Click to go to Profile) */}
                                    <Link to="/dashboard/profile" className="flex items-center gap-2 group" title={user.displayName}>
                                        <div className="w-10 h-10 rounded-full border border-blue-200 overflow-hidden group-hover:border-blue-400 transition-colors">
                                            {user?.photoURL ? (
                                                <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                <FaUserCircle className="w-full h-full text-slate-400" />
                                            )}
                                        </div>
                                    </Link>

                                    {/* Direct Logout Button */}
                                    <button
                                        onClick={handleLogout}
                                        className="px-5 py-2 rounded-full border border-slate-200 text-slate-600 font-semibold hover:bg-slate-100 hover:text-red-600 transition-colors flex items-center gap-2"
                                    >
                                        Log out
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="px-5 py-2 rounded-full text-slate-600 font-semibold hover:text-blue-600 transition-colors">
                                        Login
                                    </Link>
                                    <Link to="/register" className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Toggle Button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileOpen && (
                        <div className="md:hidden py-4 border-t border-slate-100 animate-fade-in-down">
                            <nav className="flex flex-col gap-2">
                                <NavLink to="/" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg">Home</NavLink>
                                <NavLink to="/all-products" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg">Products</NavLink>

                                {user && (
                                    <NavLink to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-blue-600 font-bold bg-blue-50 rounded-lg">Dashboard</NavLink>
                                )}

                                <NavLink to="/about" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg">About</NavLink>
                                <NavLink to="/contact" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg">Contact</NavLink>

                                <div className="mt-4 pt-4 border-t border-slate-100 px-4">
                                    {!user ? (
                                        <div className="flex flex-col gap-3">
                                            <Link to="/login" onClick={() => setMobileOpen(false)} className="btn btn-outline btn-block border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300">Login</Link>
                                            <Link to="/register" onClick={() => setMobileOpen(false)} className="btn btn-primary btn-block text-white">Register Free</Link>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                                            <Link to="/dashboard/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
                                                <img src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} className="h-10 w-10 rounded-full border border-white shadow-sm" alt="user" />
                                                <div className="overflow-hidden">
                                                    <p className="font-bold text-slate-800 text-sm truncate w-32">{user.displayName}</p>
                                                    <p className="text-xs text-slate-500 truncate w-32">{user.email}</p>
                                                </div>
                                            </Link>
                                            <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="btn btn-circle btn-sm btn-ghost text-red-500 hover:bg-red-100">
                                                <FaSignOutAlt />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 pt-[88px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Outlet />
                </div>
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
                <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white">
                            <span className="text-xl font-bold">GT</span>
                            <span className="font-bold text-lg">GarmentsTracker</span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                            Empowering garment factories with real-time production tracking, inventory management, and seamless order processing.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Contact Us</h3>
                        <ul className="space-y-2 text-slate-400 text-xs">
                            <li>
                                <span className="block text-slate-500 font-semibold">Office:</span>
                                Level-4, 34, Awal Centre, Banani, Dhaka
                            </li>
                            <li>
                                <span className="block text-slate-500 font-semibold">Email:</span>
                                support@garmentstracker.com
                            </li>
                            <li>
                                <span className="block text-slate-500 font-semibold">Helpline:</span>
                                +880 1322-901105 (Sat - Thu)
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Company</h3>
                        <ul className="space-y-2 text-slate-400">
                            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
                            <li><Link to="/all-products" className="hover:text-blue-400 transition-colors">Products</Link></li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Legal</h3>
                        <ul className="space-y-2 text-slate-400">
                            <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Social Links */}
                <div className="border-t border-slate-800/50 bg-slate-950">
                    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-slate-500">© {new Date().getFullYear()} GarmentsTracker. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                                <FaFacebookF />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all">
                                <FaTwitter />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-all">
                                <FaLinkedinIn />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
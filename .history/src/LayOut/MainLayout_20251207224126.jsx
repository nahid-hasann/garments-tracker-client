import React, { useState } from 'react';
import { Outlet, NavLink, Link } from "react-router-dom";
import useAuth from '../Hook /useAuth';

const MainLayout = () => {

    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logOut } = useAuth();

    const logOut = () => {
      log
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
            {/* ================= HEADER ================= */}
            <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-between py-3 gap-4">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-sm">
                                <span className="text-white font-bold text-lg">GT</span>
                            </div>
                            <div className="leading-tight">
                                <p className="font-bold text-slate-900 text-lg">
                                    Garments<span className="text-blue-600">Tracker</span>
                                </p>
                                <p className="text-[11px] text-slate-500">
                                    Order & Production Monitor
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-6 text-sm">
                            <Link
                                to="/"
                                className="text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                to="/all-products"
                                className="text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                All Products
                            </Link>
                            <Link
                                to="/about"
                                className="text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                About Us
                            </Link>
                            <Link
                                to="/contact"
                                className="text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                Contact
                            </Link>
                        </nav>

                        {/* Right side buttons */}
                        <div className="hidden md:flex items-center gap-3 text-sm">
                            {
                                user ?
                                    <Link
                                        onClick={logOut}
                                        className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 text-xs transition-colors"
                                    >
                                        Log out
                                    </Link>
                                    :
                                    <Link
                                        to="/login"
                                        className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 text-xs transition-colors"
                                    >
                                        Login
                                    </Link>
                            }
                            <Link
                                to="/register"
                                className="px-4 py-1.5 rounded-full bg-blue-600 text-white font-semibold text-xs shadow-sm hover:bg-blue-700 transition-colors"
                            >
                                Register
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileOpen((prev) => !prev)}
                            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200 text-slate-700"
                            aria-label="Toggle navigation"
                        >
                            {mobileOpen ? (
                                <span className="text-lg">&times;</span>
                            ) : (
                                <span className="text-lg">&#9776;</span>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileOpen && (
                        <div className="md:hidden pb-3 border-t border-slate-200">
                            <nav className="flex flex-col gap-2 pt-3 text-sm">
                                <Link
                                    to="/"
                                    className="text-slate-600 hover:text-blue-600 transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/all-products"
                                    className="text-slate-600 hover:text-blue-600 transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    All Products
                                </Link>
                                <Link
                                    to="/about"
                                    className="text-slate-600 hover:text-blue-600 transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    About Us
                                </Link>
                                <Link
                                    to="/contact"
                                    className="text-slate-600 hover:text-blue-600 transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Contact
                                </Link>

                                <div className="pt-2 flex gap-2">
                                    <Link
                                        to="/login"
                                        className="flex-1 text-center px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 text-xs transition-colors"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="flex-1 text-center px-3 py-1.5 rounded-full bg-blue-600 text-white font-semibold text-xs shadow-sm hover:bg-blue-700 transition-colors"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            {/* ================= MAIN CONTENT ================= */}
            <main className="flex-1">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <Outlet />
                </div>
            </main>

            {/* ================= FOOTER ================= */}
            <footer className="mt-8 border-t border-slate-200 bg-white">
                <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-3 text-sm">
                    {/* Brand */}
                    <div>
                        <p className="font-bold text-slate-900 mb-1">
                            Garments<span className="text-blue-600">Tracker</span>
                        </p>
                        <p className="text-slate-500 text-xs leading-relaxed">
                            A garments order & production tracking interface for small and
                            medium factories.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <p className="font-semibold text-slate-900 mb-2 text-sm">
                            Useful Links
                        </p>
                        <ul className="space-y-1 text-slate-500 text-xs">
                            <li>
                                <Link to="/" className="hover:text-blue-600">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/all-products" className="hover:text-blue-600">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="hover:text-blue-600">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact / Info */}
                    <div className="md:text-right text-xs text-slate-500">
                        <p className="font-semibold text-slate-900 mb-2 text-sm">
                            Contact
                        </p>
                        <p>Email: support@garmentstracker.dev</p>
                        <p className="mt-1">Dhaka, Bangladesh</p>
                    </div>
                </div>

                <div className="border-t border-slate-200">
                    <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-2">
                        <p className="text-[11px] text-slate-400">
                            © {new Date().getFullYear()} GarmentsTracker. All rights reserved.
                        </p>
                        <p className="text-[11px] text-slate-400">
                            Assignment Project • Garments Order & Production Tracker System
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, Link } from "react-router-dom";
import useAuth from "../Hook /useAuth";
import toast from 'react-hot-toast';

const MainLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logOut } = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const handleLogout = () => {
        logOut()
            .then(() => toast.success("Logged out successfully!"))
            .catch(() => toast.error("Logout failed"));
    };

    // Theme Toggle Logic
   

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">

            {/* ================= HEADER ================= */}
            <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-between py-3 gap-4">

                        {/* ========== Logo ========== */}
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

                        {/* ========== Desktop Menu ========== */}
                        <nav className="hidden md:flex items-center gap-6 text-sm">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 font-semibold"
                                        : "text-slate-600 hover:text-blue-600"
                                }
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/all-products"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 font-semibold"
                                        : "text-slate-600 hover:text-blue-600"
                                }
                            >
                                All Products
                            </NavLink>

                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 font-semibold"
                                        : "text-slate-600 hover:text-blue-600"
                                }
                            >
                                About Us
                            </NavLink>

                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 font-semibold"
                                        : "text-slate-600 hover:text-blue-600"
                                }
                            >
                                Contact
                            </NavLink>

                            {/* Logged in হলে Dashboard দেখাবে */}
                            {user && (
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-blue-600 font-semibold"
                                            : "text-slate-600 hover:text-blue-600"
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            )}
                        </nav>

                        {/* ========== Right Side Auth Buttons ========== */}
                        <div className="hidden md:flex items-center gap-4 text-sm">
                            {user ? (
                                <>
                                    {/* Avatar */}
                                    <img
                                        src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                        alt="avatar"
                                        className="h-8 w-8 rounded-full border border-slate-300"
                                    />

                                    {/* Logout */}
                                    <Link onClick={handleLogout} className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 text-xs transition-colors" > Log out </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 text-xs transition-colors"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/register"
                                        className="px-4 py-1.5 rounded-full bg-blue-600 text-white font-semibold text-xs shadow-sm hover:bg-blue-700 transition-colors"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* ========== Mobile Menu Button ========== */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
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

                    {/* ========== Mobile Menu ========== */}
                    {mobileOpen && (
                        <div className="md:hidden pb-3 border-t border-slate-200">
                            <nav className="flex flex-col gap-2 pt-3 text-sm">

                                <NavLink
                                    to="/"
                                    onClick={() => setMobileOpen(false)}
                                    className="text-slate-600 hover:text-blue-600"
                                >
                                    Home
                                </NavLink>

                                <NavLink
                                    to="/all-products"
                                    onClick={() => setMobileOpen(false)}
                                    className="text-slate-600 hover:text-blue-600"
                                >
                                    All Products
                                </NavLink>

                                <NavLink
                                    to="/about"
                                    onClick={() => setMobileOpen(false)}
                                    className="text-slate-600 hover:text-blue-600"
                                >
                                    About Us
                                </NavLink>

                                <NavLink
                                    to="/contact"
                                    onClick={() => setMobileOpen(false)}
                                    className="text-slate-600 hover:text-blue-600"
                                >
                                    Contact
                                </NavLink>

                                {/* Dashboard for logged in user */}
                                {user && (
                                    <NavLink
                                        to="/dashboard"
                                        onClick={() => setMobileOpen(false)}
                                        className="text-slate-600 hover:text-blue-600"
                                    >
                                        Dashboard
                                    </NavLink>
                                )}

                                {/* Auth Buttons */}

                                {!user ? (
                                    <div className="pt-2 flex gap-2">
                                        <Link
                                            to="/login"
                                            onClick={() => setMobileOpen(false)}
                                            className="flex-1 text-center px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 text-xs transition-colors"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setMobileOpen(false)}
                                            className="flex-1 text-center px-3 py-1.5 rounded-full bg-blue-600 text-white font-semibold text-xs shadow-sm hover:bg-blue-700 transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="pt-2 flex items-center gap-3">
                                        <img
                                            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                            className="h-8 w-8 rounded-full border"
                                        />

                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setMobileOpen(false);
                                            }}
                                            className="flex-1 text-center px-3 py-1.5 rounded-full bg-red-500 text-white text-xs shadow-sm hover:bg-red-600"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </nav>
                        </div>
                    )}
                    <label className="cursor-pointer grid place-items-center mr-4">
                        <input
                            onChange={handleToggle}
                            type="checkbox"
                            checked={theme === "dark"}
                            className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
                        />
                        <svg
                            className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="5" />
                            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                        </svg>
                        <svg
                            className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </label>
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
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/all-products">All Products</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
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

import React from 'react';

const MainLayout = () => {
   
        const navLinkClasses = ({ isActive }) =>
            isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-slate-700 hover:text-blue-600";

    return (
        <div className="min-h-screen flex flex-col">
            {/* NAVBAR */}
            <header className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <div className="text-xl font-bold text-blue-700">
                        Garment<span className="text-slate-800">Tracker</span>
                    </div>

                    {/* Nav links */}
                    <nav className="hidden md:flex gap-6 text-sm">
                        <NavLink to="/" className={navLinkClasses}>
                            Home
                        </NavLink>
                        <NavLink to="/all-products" className={navLinkClasses}>
                            All Products
                        </NavLink>
                        <NavLink to="/about" className={navLinkClasses}>
                            About Us
                        </NavLink>
                        <NavLink to="/contact" className={navLinkClasses}>
                            Contact
                        </NavLink>
                        <NavLink to="/login" className={navLinkClasses}>
                            Login
                        </NavLink>
                        <NavLink to="/register" className={navLinkClasses}>
                            Register
                        </NavLink>
                    </nav>

                    {/* ছোট screen এর জন্য simple text (পরে hamburger বানাতে পারো) */}
                    <div className="md:hidden text-sm text-slate-600">
                        Menu
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <Outlet />
                </div>
            </main>

            {/* FOOTER */}
            <footer className="bg-slate-900 text-slate-200 mt-10">
                <div className="max-w-6xl mx-auto px-4 py-6 grid gap-4 md:grid-cols-3 text-sm">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">GarmentTracker</h2>
                        <p className="text-slate-400">
                            A smart garments order & production tracking solution for small and medium factories.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Useful Links</h3>
                        <ul className="space-y-1 text-slate-400">
                            <li>Home</li>
                            <li>All Products</li>
                            <li>Dashboard</li>
                        </ul>
                    </div>
                    <div className="md:text-right text-slate-400">
                        <p>© {new Date().getFullYear()} GarmentTracker.</p>
                        <p>All rights reserved.</p>
                    </div>
                </div>
            </footer>
            </div>
    );
};

export default MainLayout;
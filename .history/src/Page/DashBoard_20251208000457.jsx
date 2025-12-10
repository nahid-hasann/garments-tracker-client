import React from 'react';

const DashBoard = () => {
    return (
        <div className="flex min-h-screen bg-slate-100">

            {/* ============== SIDEBAR ============== */}
            <aside
                className={`bg-white border-r border-slate-200 transition-all duration-300
          ${open ? "w-64" : "w-16"} overflow-hidden`}
            >
                <div className="p-4 flex items-center justify-between">
                    <p className="font-bold text-slate-800 text-lg">
                        {open ? "Dashboard" : "DB"}
                    </p>

                    <button onClick={() => setOpen(!open)} className="text-slate-500">
                        {open ? "◀" : "▶"}
                    </button>
                </div>

                {/* USER INFO */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200">
                    <img
                        src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                        className="h-10 w-10 rounded-full border"
                    />

                    {open && (
                        <div>
                            <p className="font-semibold text-sm">{user?.displayName}</p>
                            <p className="text-xs text-slate-500">{user?.email}</p>
                        </div>
                    )}
                </div>

                {/* MENU ITEMS */}
                <nav className="mt-4 px-2 space-y-1">
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-md text-sm ${isActive ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-200"
                            }`
                        }
                    >
                        Dashboard Home
                    </NavLink>

                    {/* Buyer menu */}
                    <NavLink
                        to="/dashboard/my-orders"
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-md text-sm ${isActive ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-200"
                            }`
                        }
                    >
                        My Orders
                    </NavLink>

                    <NavLink
                        to="/dashboard/track-order"
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-md text-sm ${isActive ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-200"
                            }`
                        }
                    >
                        Track Order
                    </NavLink>

                    {/* Manager menu */}
                    <NavLink
                        to="/dashboard/add-product"
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-md text-sm ${isActive ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-200"
                            }`
                        }
                    >
                        Add Product
                    </NavLink>

                    <NavLink
                        to="/dashboard/manage-products"
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-md text-sm ${isActive ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-200"
                            }`
                        }
                    >
                        Manage Products
                    </NavLink>

                    <NavLink
                        to="/dashboard/pending-orders"
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-md text-sm ${isActive ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-200"
                            }`
                        }
                    >
                        Pending Orders
                    </NavLink>
                </nav>
            </aside>

            {/* ============== RIGHT SIDE CONTENT ============== */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default DashBoard;
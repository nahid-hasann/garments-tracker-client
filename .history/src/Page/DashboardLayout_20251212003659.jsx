import { NavLink, Outlet, Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../Hook /useAuth";

const DashboardLayout = () => {
    const { user, role } = useAuth();
    const [drawerId] = useState("dashboard-drawer"); // unique id

    return (
        <div className="drawer lg:drawer-open min-h-screen bg-base-200">
            {/* Drawer Toggle */}
            <input id={drawerId} type="checkbox" className="drawer-toggle" />

            {/* =============== MAIN CONTENT =============== */}
            <div className="drawer-content flex flex-col">
                {/* Top Navbar */}
                <nav className="navbar w-full bg-base-300 px-4">
                    <div className="flex-1 flex items-center gap-3">
                        {/* Sidebar toggle (mobile) */}
                        <label
                            htmlFor={drawerId}
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2"
                                fill="none"
                                stroke="currentColor"
                                className="inline-block size-5"
                            >
                                <path d="M4 6h16" />
                                <path d="M4 12h16" />
                                <path d="M4 18h16" />
                            </svg>
                        </label>

                        <div>
                            <p className="font-semibold text-sm lg:text-base">
                                GarmentsTracker Dashboard
                            </p>
                            <p className="text-xs text-base-content/70">
                                Real-time orders & production overview
                            </p>
                        </div>
                    </div>

                    {/* Quick link to main site + small user info */}
                    <div className="flex items-center gap-3">
                        <Link to="/" className="btn btn-ghost btn-sm normal-case text-xs">
                            ← Back to Site
                        </Link>

                        {user && (
                            <div className="flex items-center gap-2">
                                <div className="avatar">
                                    <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img
                                            src={
                                                user.photoURL ||
                                                "https://i.ibb.co/4pDNDk1/avatar.png"
                                            }
                                            alt="avatar"
                                        />
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-xs font-semibold">
                                        {user.displayName || "User"}
                                    </p>
                                    <p className="text-[11px] text-base-content/70">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Page content */}
                <div className="p-4 lg:p-6">
                    <div className="bg-base-100 rounded-xl shadow-sm border border-base-200 p-4 lg:p-6">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* =============== SIDEBAR =============== */}
            <div className="drawer-side is-drawer-close:overflow-visible">
                <label
                    htmlFor={drawerId}
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>

                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-64 transition-all duration-300">
                    {/* BRAND / USER BLOCK */}
                    <div className="w-full border-b border-base-300 px-3 py-3 flex items-center gap-3">
                        <div className="avatar">
                          
                                <div className="w-9 rounded-xl bg-primary text-primary-content flex items-center justify-center font-bold">
                                  <Link>
                                  Gt
                                  </Link>
                                </div>
                          
                        </div>
                        <div className="is-drawer-close:hidden leading-tight">
                            <p className="font-semibold text-sm">GarmentsTracker</p>
                            <p className="text-[11px] text-base-content/60">
                                Dashboard Panel
                            </p>
                        </div>
                    </div>

                    {/* MENU */}
                    <ul className="menu w-full grow px-1 py-2 text-sm">
                        {/* Common / Overview */}
                        <li className="menu-title is-drawer-close:hidden">
                            <span>Overview</span>
                        </li>
                       

                        <li>
                            <NavLink
                                to="/dashboard"
                                end
                                className={({ isActive }) =>
                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-base-300 text-primary font-semibold" : ""
                                    }`
                                }
                                data-tip="Dashboard Home"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    fill="none"
                                    stroke="currentColor"
                                    className="my-1.5 inline-block size-4"
                                >
                                    <path d="M3 12l9-9l9 9" />
                                    <path d="M5 10v10h14V10" />
                                </svg>
                                <span className="is-drawer-close:hidden">Dashboard Home</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/profile"
                                className={({ isActive }) =>
                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-base-300 text-primary font-semibold" : ""
                                    }`
                                }
                                data-tip="My Profile"
                            >
                                {/* Profile Icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    fill="none"
                                    stroke="currentColor"
                                    className="my-1.5 inline-block size-4"
                                >
                                    <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" />
                                    <path d="M4 22v-1c0-3.314 2.686-6 6-6h4c3.314 0 6 2.686 6 6v1" />
                                </svg>

                                <span className="is-drawer-close:hidden">My Profile</span>
                            </NavLink>
                        </li>

                        {/* ================= BUYER SECTION ================= */}
                        {role === "buyer" && (
                            <>
                                <li className="menu-title is-drawer-close:hidden mt-3">
                                    <span>Buyer</span>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/my-orders"
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-base-300 text-primary font-semibold" : ""
                                            }`
                                        }
                                        data-tip="My Orders"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            fill="none"
                                            stroke="currentColor"
                                            className="my-1.5 inline-block size-4"
                                        >
                                            <path d="M4 7h16" />
                                            <path d="M4 17h16" />
                                            <path d="M7 4v3" />
                                            <path d="M17 14v3" />
                                        </svg>
                                        <span className="is-drawer-close:hidden">My Orders</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/track-order"
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-base-300 text-primary font-semibold" : ""
                                            }`
                                        }
                                        data-tip="Track Order"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            fill="none"
                                            stroke="currentColor"
                                            className="my-1.5 inline-block size-4"
                                        >
                                            <circle cx="12" cy="12" r="3" />
                                            <path d="M3 12h3" />
                                            <path d="M18 12h3" />
                                            <path d="M12 3v3" />
                                            <path d="M12 18v3" />
                                        </svg>
                                        <span className="is-drawer-close:hidden">Track Order</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* ================= MANAGER SECTION ================= */}
                        {role === "manager" && (
                            <>
                                <li className="menu-title is-drawer-close:hidden mt-3">
                                    <span>Manager</span>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/add-product"
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-base-300 text-primary font-semibold" : ""
                                            }`
                                        }
                                        data-tip="Add Product"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            fill="none"
                                            stroke="currentColor"
                                            className="my-1.5 inline-block size-4"
                                        >
                                            <path d="M12 5v14" />
                                            <path d="M5 12h14" />
                                        </svg>
                                        <span className="is-drawer-close:hidden">Add Product</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/manage-products"
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-base-300 text-primary font-semibold" : ""
                                            }`
                                        }
                                        data-tip="Manage Products"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            fill="none"
                                            stroke="currentColor"
                                            className="my-1.5 inline-block size-4"
                                        >
                                            <rect x="4" y="4" width="7" height="7" rx="1" />
                                            <rect x="13" y="4" width="7" height="7" rx="1" />
                                            <rect x="4" y="13" width="7" height="7" rx="1" />
                                            <rect x="13" y="13" width="7" height="7" rx="1" />
                                        </svg>
                                        <span className="is-drawer-close:hidden">
                                            Manage Products
                                        </span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/pending-orders"
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-base-300 text-primary font-semibold" : ""
                                            }`
                                        }
                                        data-tip="Pending Orders"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            fill="none"
                                            stroke="currentColor"
                                            className="my-1.5 inline-block size-4"
                                        >
                                            <path d="M4 4h16v4H4z" />
                                            <path d="M4 12h10v8H4z" />
                                            <path d="M18 12v8" />
                                        </svg>
                                        <span className="is-drawer-close:hidden">
                                            Pending Orders
                                        </span>
                                    </NavLink>
                                </li>
                            </>
                        )}

<li>
                            {role === "manager" && (
                                <NavLink
                                    to="/dashboard/approved-orders"
                                    className={({ isActive }) =>
                                        `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-base-300 text-primary font-semibold" : ""
                                        }`
                                    }
                                    data-tip="Approved Orders"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        fill="none"
                                        stroke="currentColor"
                                        className="my-1.5 inline-block size-4"
                                    >
                                        <path d="M5 12l5 5l9-9" />
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                    </svg>
                                    <span className="is-drawer-close:hidden">Approved Orders</span>
                                </NavLink>
                            )}
                        </li>


                        {/* ================= ADMIN SECTION (এখন manager-ই admin এর কাজ করবে) ================= */}
                        {role === "admin" && (
                            <>
                                <li className="menu-title is-drawer-close:hidden mt-3">
                                    <span>Admin</span>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/manage-users"
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-base-300 text-primary font-semibold" : ""
                                            }`
                                        }
                                        data-tip="Manage Users"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            fill="none"
                                            stroke="currentColor"
                                            className="my-1.5 inline-block size-4"
                                        >
                                            <circle cx="9" cy="7" r="3" />
                                            <circle cx="17" cy="7" r="3" />
                                            <path d="M4 21v-2a4 4 0 0 1 4-4h2" />
                                            <path d="M14 21v-2a4 4 0 0 1 4-4h2" />
                                        </svg>
                                        <span className="is-drawer-close:hidden">Manage Users</span>
                                    </NavLink>
                                </li>

                                <li>
                                    {role === "admin" && (
                                    <NavLink
                                        to="/dashboard/all-products"
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-base-300 text-primary font-semibold" : ""
                                            }`
                                        }
                                        data-tip="All Products"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            fill="none"
                                            stroke="currentColor"
                                            className="my-1.5 inline-block size-4"
                                        >
                                            <path d="M4 4h7v7H4z" />
                                            <path d="M13 4h7v7h-7z" />
                                            <path d="M4 13h7v7H4z" />
                                            <path d="M13 13h7v7h-7z" />
                                        </svg>
                                        <span className="is-drawer-close:hidden">All Products</span>
                                    </NavLink>
                                    )}
                                </li>

                                <li>
                                    {role === "admin" && (
                                    <NavLink
                                        to="/dashboard/all-orders"
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-base-300 text-primary font-semibold" : ""
                                            }`
                                        }
                                        data-tip="All Orders"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            fill="none"
                                            stroke="currentColor"
                                            className="my-1.5 inline-block size-4"
                                        >
                                            <path d="M5 7h14" />
                                            <path d="M5 11h14" />
                                            <path d="M5 15h14" />
                                            <path d="M5 19h14" />
                                        </svg>
                                        <span className="is-drawer-close:hidden">All Orders</span>
                                    </NavLink>
                                    )}
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;

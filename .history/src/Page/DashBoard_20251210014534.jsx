import React from "react";
import useAuth from "../Hook /useAuth";
// import useAuth from "../Hook/useAuth";

const DashBoard = () => {
    const { user } = useAuth();

    const stats = [
        {
            label: "Open Orders",
            value: 32,
            sub: "+5 today",
        },
        {
            label: "In Production",
            value: 18,
            sub: "Cutting / Sewing",
        },
        {
            label: "On-time Delivery",
            value: "94%",
            sub: "Last 30 days",
        },
        {
            label: "Active Buyers",
            value: 12,
            sub: "Repeat clients",
        },
    ];

    const recentOrders = [
        { id: "ORD-1045", buyer: "H&M Europe", style: "Men’s Polo", qty: 1200, status: "Cutting" },
        { id: "ORD-1044", buyer: "Zara Spain", style: "Ladies Denim", qty: 800, status: "Sewing" },
        { id: "ORD-1043", buyer: "Next UK", style: "Kids Hoodie", qty: 650, status: "Finishing" },
        { id: "ORD-1042", buyer: "C&A Germany", style: "Basic T-Shirt", qty: 3000, status: "Shipped" },
    ];

    const productionStages = [
        { step: "Cutting", count: 6 },
        { step: "Sewing", count: 5 },
        { step: "Finishing", count: 3 },
        { step: "QC Checked", count: 2 },
        { step: "Packed", count: 1 },
    ];

    return (
        <div className="space-y-6">
            <Helmet>
                <title>Dashboard | Garments Tracker</title>
            </Helmet>

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div>
                    <p className="text-xs uppercase tracking-wide text-base-content/60">
                        Dashboard Overview
                    </p>
                    <h1 className="text-xl md:text-2xl font-bold text-base-content">
                        Welcome back, {user?.displayName || "Production Manager"} 👋
                    </h1>
                    <p className="text-sm text-base-content/70 mt-1">
                        Here is a quick snapshot of your garments orders and production
                        pipeline for today.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium">
                        Factory status: Online
                    </div>
                </div>
            </div>

            {/* STATS CARDS */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                    <div
                        key={item.label}
                        className="rounded-xl bg-base-100 border border-base-200 px-4 py-3 shadow-sm"
                    >
                        <p className="text-xs text-base-content/60 mb-1">{item.label}</p>
                        <p className="text-2xl font-semibold text-base-content">
                            {item.value}
                        </p>
                        <p className="text-[11px] text-base-content/60 mt-1">{item.sub}</p>
                    </div>
                ))}
            </div>

            {/* MAIN GRID */}
            <div className="grid gap-4 lg:grid-cols-3">
                {/* RECENT ORDERS TABLE */}
                <div className="lg:col-span-2 rounded-xl bg-base-100 border border-base-200 shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h2 className="text-sm font-semibold text-base-content">
                                Recent Orders
                            </h2>
                            <p className="text-xs text-base-content/60">
                                Latest buyer orders in your factory lines.
                            </p>
                        </div>
                        <button className="btn btn-ghost btn-xs normal-case text-[11px]">
                            View all
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra-zebra table-sm">
                            <thead>
                                <tr className="text-xs text-base-content/60">
                                    <th>Order ID</th>
                                    <th>Buyer</th>
                                    <th>Style</th>
                                    <th className="text-right">Qty</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs">
                                {recentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="font-mono text-[11px]">{order.id}</td>
                                        <td>{order.buyer}</td>
                                        <td>{order.style}</td>
                                        <td className="text-right">{order.qty}</td>
                                        <td>
                                            <span className="badge badge-ghost badge-xs">
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* PRODUCTION STATUS */}
                <div className="rounded-xl bg-base-100 border border-base-200 shadow-sm p-4 space-y-3">
                    <div>
                        <h2 className="text-sm font-semibold text-base-content">
                            Production Status
                        </h2>
                        <p className="text-xs text-base-content/60">
                            How many orders are in each stage right now.
                        </p>
                    </div>

                    <div className="space-y-2">
                        {productionStages.map((stage) => (
                            <div key={stage.step} className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <p className="font-medium text-base-content">{stage.step}</p>
                                    <p className="text-base-content/70">{stage.count} orders</p>
                                </div>
                                <progress
                                    className="progress progress-primary h-2"
                                    value={stage.count}
                                    max="10"
                                ></progress>
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 rounded-lg bg-base-200/70 px-3 py-2 text-[11px] text-base-content/70">
                        Tip: Use the “Track Order” page from the sidebar to see detailed
                        movement for a specific booking.
                    </div>
                </div>
            </div>

            {/* BOTTOM ROW – QUICK INSIGHTS */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-base-100 border border-base-200 p-4">
                    <p className="text-xs font-semibold text-base-content mb-1">
                        Today&apos;s shipment window
                    </p>
                    <p className="text-sm text-base-content/70">
                        3 orders scheduled to be shipped before{" "}
                        <span className="font-semibold text-base-content">8:00 PM</span>.
                    </p>
                </div>

                <div className="rounded-xl bg-base-100 border border-base-200 p-4">
                    <p className="text-xs font-semibold text-base-content mb-1">
                        Line utilization
                    </p>
                    <p className="text-sm text-base-content/70">
                        12 active lines • average efficiency{" "}
                        <span className="font-semibold text-base-content">87%</span>.
                    </p>
                </div>

                <div className="rounded-xl bg-base-100 border border-base-200 p-4">
                    <p className="text-xs font-semibold text-base-content mb-1">
                        Pending approvals
                    </p>
                    <p className="text-sm text-base-content/70">
                        4 new bookings waiting for manager / admin approval.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;

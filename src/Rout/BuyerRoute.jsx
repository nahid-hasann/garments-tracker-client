// src/Rout/BuyerRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook /useAuth"; // যেভাবে আগেও useAuth import করো, সেভাবে

const BuyerRoute = ({ children }) => {
    const { user, role, loading } = useAuth();
    const location = useLocation();

    // এখনও user / role লোড হচ্ছে
    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    // login না থাকলে → login page এ পাঠাও
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // login আছে কিন্তু buyer না হলে → access deny message
    if (role !== "buyer") {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-center">
                <div className="space-y-2">
                    <p className="text-sm font-semibold text-red-500">
                        Access denied
                    </p>
                    <p className="text-xs text-slate-500">
                        This page is only for <span className="font-medium">Buyer</span> role.
                    </p>
                </div>
            </div>
        );
    }

    // সব ঠিক থাকলে original children দেখাও
    return children;
};

export default BuyerRoute;

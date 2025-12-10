// src/Rout/RoleRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook /useAuth";

const RoleRoute = ({ allowedRoles = [], children }) => {
    const { user, loading, role } = useAuth();
    const location = useLocation();

    // 1) auth এখনো লোড হচ্ছে
    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    // 2) লগইনই নাই → login page এ পাঠাবে
    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // 3) role allow না → ছোট একটা Access denied মেসেজ
    if (!allowedRoles.includes(role)) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center space-y-2">
                    <p className="text-sm font-semibold text-red-500">
                        Access denied
                    </p>
                    <p className="text-xs text-slate-500">
                        You don&apos;t have permission to view this page.
                    </p>
                </div>
            </div>
        );
    }

    // 4) সব ঠিক থাকলে children রেন্ডার হবে
    return children;
};

export default RoleRoute;

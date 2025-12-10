import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";

const NotFound = () => {
    return (
        <div className="text-center py-10">
            <Helmet>
                <title>404 - Page Not Found | Garments Tracker</title>
            </Helmet>

            <h2 className="text-3xl font-bold mb-2">404</h2>
            <p className="text-slate-600 mb-4">Page not found</p>
            <Link
                to="/"
                className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white text-sm"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
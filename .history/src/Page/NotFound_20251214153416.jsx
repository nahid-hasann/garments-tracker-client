import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
            <Helmet>
                <title>404 - Page Not Found | Garments Tracker</title>
            </Helmet>

            <div className="text-center space-y-6 max-w-lg mx-auto">
             
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-4xl shadow-sm">
                        <FaExclamationTriangle />
                    </div>
                </div>

              
                <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 drop-shadow-sm">
                    404
                </h1>

             
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-800">
                        Oops! Page not found.
                    </h2>
                    <p className="text-slate-500">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

               
                <div className="pt-4">
                    <Link
                        to="/"
                        className="btn btn-primary btn-wide rounded-full text-white shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all transform hover:-translate-y-1"
                    >
                        <FaHome className="mr-2" /> Go Back Home
                    </Link>
                </div>
            </div>

          
            <div className="absolute bottom-10 text-slate-400 text-xs">
                &copy; {new Date().getFullYear()} Garments Tracker. All rights reserved.
            </div>
        </div>
    );
};

export default NotFound;
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../Hook /useAuth';
import toast from 'react-hot-toast';
import axios from 'axios';
// import { useAnimate } from 'framer-motion';
import { Helmet } from "react-helmet-async";
import useAxiosSecure from '../Hook /useAxiosSecure';

const Login = () => {

    const { logInWithGoogle, signIn } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();



    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(userCredential => {
                console.log(userCredential.user);
                navigate('/');
                toast.success("Login successful!");
            })
            .catch(error => {

                setError(error.message);
                toast.error(error.message);

            })

        // TODO: later we will add Firebase login + JWT here
        // console.log("Login submit");
    };

    const handleGooleLogin = async () => {
        try {
            const result = await logInWithGoogle();
            const gUser = result.user;
            // console.log("Google user:", result.user);
            await axios.post("/users", {
                name: gUser.displayName,
                email: gUser.email,
                photoURL: gUser.photoURL,
                role: "buyer",
                status: "pending"
            })
            navigate('/');
            toast.success("Signed in with Google!");
        } catch (err) {
            // console.error(err);
            setError(err.message);
            toast.error(err.message);

        }
    }

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <Helmet>
                <title>Login | Garments Tracker</title>
            </Helmet>

            <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                {/* Left side: form */}
                <div className="px-6 py-8 md:px-8 md:py-10">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                        Welcome back
                    </p>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                        Sign in to your workspace
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">
                        Access your garments orders, production dashboard and tracking
                        tools in one place.
                    </p>

                    {/* Social login */}
                    <button
                        onClick={handleGooleLogin}
                        type="button"
                        className="w-full flex items-center justify-center gap-2 border border-slate-200 rounded-lg py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors mb-4"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="h-4 w-4"
                        />
                        <span>Continue with Google</span>
                    </button>

                    <div className="flex items-center gap-3 my-4">
                        <div className="h-px bg-slate-200 flex-1" />
                        <span className="text-[11px] uppercase tracking-wide text-slate-400">
                            or sign in with email
                        </span>
                        <div className="h-px bg-slate-200 flex-1" />
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-800">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <label className="font-medium text-slate-800">Password</label>
                                <button
                                    type="button"
                                    className="text-xs text-blue-600 hover:text-blue-700"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                            />
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-400"
                                />
                                <span>Keep me signed in</span>
                            </label>
                        </div>

                        {error && (
                            <p className="text-[12px] text-red-500 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full mt-2 rounded-lg bg-blue-600 text-white text-sm font-semibold py-2.5 hover:bg-blue-700 shadow-sm transition-colors"
                        >
                            Sign in
                        </button>
                    </form>

                    <p className="text-xs text-slate-500 mt-4">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 font-medium hover:text-blue-700"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>

                {/* Right side: illustration / info */}
                <div className="hidden md:block bg-slate-900 text-slate-100 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/60 via-slate-900 to-cyan-500/40" />
                    <div className="relative h-full flex flex-col justify-between p-8">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-300 mb-2">
                                GarmentsTracker
                            </p>
                            <h2 className="text-xl font-semibold mb-2">
                                Real-time production & order visibility.
                            </h2>
                            <p className="text-sm text-slate-200/90">
                                Monitor cutting, sewing, finishing and shipment status for every
                                buyer order — directly from your browser.
                            </p>
                        </div>

                        <div className="bg-white/10 border border-white/15 rounded-xl p-4 text-xs space-y-2">
                            <p className="font-semibold text-slate-50">
                                Today&apos;s highlight
                            </p>
                            <div className="flex justify-between text-slate-100/90">
                                <div>
                                    <p className="text-[11px]">Open Orders</p>
                                    <p className="text-lg font-bold">32</p>
                                </div>
                                <div>
                                    <p className="text-[11px]">On-Time Ratio</p>
                                    <p className="text-lg font-bold text-emerald-300">94%</p>
                                </div>
                                <div>
                                    <p className="text-[11px]">Active Lines</p>
                                    <p className="text-lg font-bold">12</p>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-200/80">
                                Sign in to view detailed analytics and track your production
                                pipeline.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
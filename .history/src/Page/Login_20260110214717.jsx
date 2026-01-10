import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { Helmet } from "react-helmet-async";
import useAuth from '../Hook /useAuth';
import useAxiosSecure from '../Hook /useAxiosSecure';


const Login = () => {
    const { logInWithGoogle, signIn } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();

    
    const handleDemoLogin = (email, password, role) => {
        signIn(email, password)
            .then(() => {
                navigate('/');
                toast.success(`${role} Demo Login successful!`);
            })
            .catch(error => {
                setError(error.message);
                toast.error(error.message);
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(() => {
                navigate('/');
                toast.success("Login successful!");
            })
            .catch(error => {
                setError(error.message);
                toast.error(error.message);
            });
    };

    const handleGooleLogin = async () => {
        try {
            const result = await logInWithGoogle();
            const gUser = result.user;

            await axiosSecure.post("/users", {
                name: gUser.displayName,
                email: gUser.email,
                photoURL: gUser.photoURL,
                role: "buyer",
                status: "pending"
            });
            navigate('/');
            toast.success("Signed in with Google!");
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        }
    }

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
            <Helmet>
                <title>Login | Garments Tracker</title>
            </Helmet>

            <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">

                <div className="px-6 py-8 md:px-8 md:py-10">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                        Welcome back
                    </p>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                        Sign in to your workspace
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">
                        Access your garments orders, production dashboard and tracking tools.
                    </p>

                    {/* --- DEMO LOGIN BUTTONS START --- */}
                    <div className="mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 mb-2 uppercase text-center tracking-wider">
                            Quick Demo Access
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => handleDemoLogin('jodu@modhu.com', 'Aa123456', 'Admin')}
                                className="flex flex-col items-center justify-center p-2 rounded bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 transition active:scale-95"
                            >
                                <span className="text-xs font-bold">Admin</span>
                            </button>

                            <button
                                onClick={() => handleDemoLogin('rider@one.com', 'Aa123456', 'Manager')}
                                className="flex flex-col items-center justify-center p-2 rounded bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100 transition active:scale-95"
                            >
                                <span className="text-xs font-bold">Manager</span>
                            </button>

                            <button
                                onClick={() => handleDemoLogin('iling@biling.com', 'Aa123456', 'Buyer')}
                                className="flex flex-col items-center justify-center p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition active:scale-95"
                            >
                                <span className="text-xs font-bold">Buyer</span>
                            </button>
                        </div>
                    </div>
                    {/* --- DEMO LOGIN BUTTONS END --- */}

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
                                Monitor cutting, sewing, finishing and shipment status.
                            </p>
                        </div>

                        <div className="bg-white/10 border border-white/15 rounded-xl p-4 text-xs space-y-2">
                            <p className="font-semibold text-slate-50">
                                Demo Credentials:
                            </p>
                            <div className="space-y-1 text-slate-300 text-[11px]">
                                <div className='flex justify-between'>
                                    <span>Admin:</span> <span className='font-mono'>jodu@modhu.com</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Manager:</span> <span className='font-mono'>rider@one.com</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Buyer:</span> <span className='font-mono'>iling@biling.com</span>
                                </div>
                                <div className='flex justify-between border-t border-white/10 pt-1 mt-1'>
                                    <span>Password:</span> <span className='font-mono'>Aa123456</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../Hook /useAuth';
import toast from "react-hot-toast";
import { auth } from '../firebase.init';
import axios from 'axios';


const Register = () => {

    const { registerUser, updateUserProfile, logInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        // const role = form.role.value;
        const password = form.password.value;
        const role = form.role.value;


        if (password.length < 6) {
            return setError("Password must be at least 6 characters long.");
        }
        if (!/[A-Z]/.test(password)) {
            return setError("Password must contain at least one uppercase letter.");
        }
        if (!/[a-z]/.test(password)) {
            return setError("Password must contain at least one lowercase letter.");
        }

        try {
            const result = await registerUser(email, password)
            console.log("New user:", result.user);
            await updateUserProfile({
                displayName: name,
                photoURL: photoURL
            });
            await axios.post("http://localhost:8000/users", {
                name,
                email,
                photoURL,
                role,
                status: "pending"
            });
            toast.success("Account created successfully!");
            navigate('/');
        } catch (error) {
            // console.error(error)
            setError(error.message);
            toast.error(`${error.message}`);

        }

        // console.log("Register submit");
    };

    const handleGoogleRigister = async () => {
        try {
            const result = await logInWithGoogle();
            const user = result.user;

            axios.post("http://localhost:8000/users", {
                
            })

            // console.log("Google user:", result.user);
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
            <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                {/* Left: illustration / info */}
                <div className="hidden md:block bg-slate-900 text-slate-100 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 via-slate-900 to-emerald-500/40" />
                    <div className="relative h-full flex flex-col justify-between p-8">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-300 mb-2">
                                Create account
                            </p>
                            <h2 className="text-xl font-semibold mb-2">
                                Join your garments production workspace.
                            </h2>
                            <p className="text-sm text-slate-200/90">
                                Register as a buyer or manager and start tracking orders,
                                approvals and production in one place.
                            </p>
                        </div>

                        <div className="bg-white/10 border border-white/15 rounded-xl p-4 text-xs space-y-2">
                            <p className="font-semibold text-slate-50">
                                Role-based access control
                            </p>
                            <ul className="list-disc list-inside text-slate-200/90 space-y-1">
                                <li>Buyers can place and track orders.</li>
                                <li>Managers can add products and approve orders.</li>
                                <li>Admin can manage users, orders & products.</li>
                            </ul>
                            <p className="text-[11px] text-slate-200/80">
                                New accounts remain <span className="font-semibold">Pending</span> until reviewed by an admin.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: form */}
                <div className="px-6 py-8 md:px-8 md:py-10">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                        Get started free
                    </p>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                        Create your account
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">
                        Set up your profile and select your role inside the garments
                        tracking system.
                    </p>

                    {/* Social register (same design as login) */}
                    <button
                        onClick={handleGoogleRigister}
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
                            or register with email
                        </span>
                        <div className="h-px bg-slate-200 flex-1" />
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Name */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-800">
                                Full name
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="John Doe"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                            />
                        </div>

                        {/* Email */}
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

                        {/* photoURL */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-800">
                                Profile photo URL
                            </label>
                            <input
                                type="url"
                                name="photoURL"
                                placeholder="https://your-photo-link.com/avatar.jpg"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                            />
                        </div>

                        {/* Role + Status */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-800">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    required
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                                >
                                    <option value="">Select role</option>
                                    <option value="buyer">Buyer</option>
                                    <option value="manager">Manager</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-800">
                                    Account status
                                </label>
                                <input
                                    type="text"
                                    value="Pending"
                                    disabled
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-slate-50 text-slate-500"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-800">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="At least 6 characters"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                            />
                            <p className="text-[11px] text-slate-500 mt-1">
                                Must contain at least one uppercase letter, one lowercase
                                letter and minimum 6 characters. (We&apos;ll validate this in the
                                next step.)
                            </p>
                        </div>
                        {error && (
                            <p className="text-[12px] text-red-500 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                                {error}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 text-white text-sm font-semibold py-2.5 hover:bg-blue-700 shadow-sm transition-colors"
                        >
                            Create account
                        </button>
                    </form>

                    <p className="text-xs text-slate-500 mt-4">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 font-medium hover:text-blue-700"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
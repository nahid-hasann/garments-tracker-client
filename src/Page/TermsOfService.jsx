import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
            <Helmet>
                <title>Terms of Service | Garments Tracker</title>
            </Helmet>

            <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
            <p className="text-slate-500 text-sm">Last updated: January 2026</p>

            <div className="space-y-4 text-slate-700">
                <h2 className="text-xl font-semibold text-slate-900">1. Acceptance of Terms</h2>
                <p>By accessing and using GarmentsTracker, you accept and agree to be bound by the terms and provision of this agreement.</p>

                <h2 className="text-xl font-semibold text-slate-900">2. User Accounts</h2>
                <p>You are responsible for maintaining the confidentiality of your password and account. You agree to notify us immediately of any unauthorized use of your account.</p>

                <h2 className="text-xl font-semibold text-slate-900">3. Orders and Payments</h2>
                <p>All orders placed through the platform are subject to factory acceptance. Payments processed via "PayFirst" are handled securely. Cash on Delivery is available for specific regions.</p>

                <h2 className="text-xl font-semibold text-slate-900">4. Termination</h2>
                <p>We reserve the right to suspend or terminate your account if you violate our terms or engage in fraudulent activities.</p>
            </div>
        </div>
    );
};

export default TermsOfService;
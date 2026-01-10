import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
            <Helmet>
                <title>Privacy Policy | Garments Tracker</title>
            </Helmet>

            <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
            <p className="text-slate-500 text-sm">Last updated: January 2026</p>

            <div className="space-y-4 text-slate-700">
                <h2 className="text-xl font-semibold text-slate-900">1. Information We Collect</h2>
                <p>We collect information you provide directly to us when you register for an account, place an order, or communicate with us. This includes your name, email address, phone number, and factory address.</p>

                <h2 className="text-xl font-semibold text-slate-900">2. How We Use Your Information</h2>
                <p>We use the information to manage your orders, provide production updates, process payments via Stripe, and improve our factory management services.</p>

                <h2 className="text-xl font-semibold text-slate-900">3. Data Security</h2>
                <p>We implement appropriate technical measures to protect your personal data against unauthorized access. Passwords are encrypted, and payment data is processed securely by Stripe.</p>

                <h2 className="text-xl font-semibold text-slate-900">4. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at support@garmentstracker.com.</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
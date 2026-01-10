import React from 'react';
import toast from 'react-hot-toast';

const Newsletter = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        toast.success("Thank you for subscribing!");
        e.target.reset();
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-10 md:p-16 text-center text-white shadow-xl my-10">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Stay Updated with Production Trends</h2>
                <p className="text-blue-100 text-lg">
                    Join 5,000+ managers and buyers. Get the latest insights on garment manufacturing and supply chain management.
                </p>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto bg-white/10 p-2 rounded-full border border-white/20 backdrop-blur-sm">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        required
                        className="flex-1 bg-transparent px-4 py-2 text-white placeholder-blue-100 outline-none w-full"
                    />
                    <button type="submit" className="btn bg-white text-blue-600 border-none rounded-full px-8 hover:bg-blue-50">
                        Subscribe
                    </button>
                </form>

                <p className="text-xs text-blue-200 mt-4">We respect your privacy. No spam, ever.</p>
            </div>
        </section>
    );
};

export default Newsletter;
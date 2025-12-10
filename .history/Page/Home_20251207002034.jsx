import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
    const message = useState('');

    useEffect(() => {
        axios.get("http://localhost:8000/")
        .then(res.data )
    }, [])

    return (
        <div className="space-y-4">
            <section className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    Garments Order & Production Tracker
                </h1>
                <p className="text-slate-600">
                    Assignment project – garments factory order, production & tracking manage korar system.
                </p>
            </section>

            <section className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm font-semibold text-blue-900">
                    Backend Status:
                </p>
                <p className="text-blue-800 mt-1">{message}</p>
            </section>
        </div>
    );
};

export default Home;
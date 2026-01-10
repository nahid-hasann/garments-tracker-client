import React from 'react';
import { FaAirbnb, FaAmazon, FaApple, FaGoogle, FaMicrosoft, FaSpotify } from 'react-icons/fa';

const BrandsSection = () => {
    return (
        <section className="bg-slate-900 py-12 px-6 rounded-3xl text-center space-y-8">
            <p className="text-slate-400 text-sm uppercase tracking-[0.2em]">Trusted by 50+ Global Retailers</p>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
                <FaGoogle className="text-4xl text-white hover:opacity-100 transition-opacity cursor-pointer" />
                <FaAmazon className="text-4xl text-white hover:opacity-100 transition-opacity cursor-pointer" />
                <FaApple className="text-4xl text-white hover:opacity-100 transition-opacity cursor-pointer" />
                <FaSpotify className="text-4xl text-white hover:opacity-100 transition-opacity cursor-pointer" />
                <FaMicrosoft className="text-4xl text-white hover:opacity-100 transition-opacity cursor-pointer" />
                <FaAirbnb className="text-4xl text-white hover:opacity-100 transition-opacity cursor-pointer" />
            </div>
        </section>
    );
};

export default BrandsSection;
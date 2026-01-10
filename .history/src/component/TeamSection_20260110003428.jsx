import React from 'react';
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const TeamSection = () => {
    const team = [
        { name: "Alex Johnson", role: "Head of Production", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
        { name: "Sarah Carter", role: "Quality Assurance", img: "https://images.unsplash.com/photo-1573496359-7013c53bcae4?q=80&w=200&auto=format&fit=crop" },
        { name: "Michael Doe", role: "Logistics Manager", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" },
        { name: "Emily Smith", role: "Client Relations", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" },
    ];

    return (
        <section className="py-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-3xl font-bold text-slate-900">Meet the Experts</h2>
                <p className="text-slate-500 mt-2">The dedicated team ensuring your production runs smoothly.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {team.map((member, idx) => (
                    <div key={idx} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300">
                        <div className="h-64 overflow-hidden relative">
                            <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button className="btn btn-circle btn-sm btn-white text-blue-600"><FaLinkedinIn /></button>
                                <button className="btn btn-circle btn-sm btn-white text-sky-500"><FaTwitter /></button>
                            </div>
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="font-bold text-lg text-slate-800">{member.name}</h3>
                            <p className="text-sm text-slate-500">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TeamSection;
import React from "react";
import { Helmet } from "react-helmet-async";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import toast from "react-hot-toast";

const Contact = () => {

    const handleSendMessage = (e) => {
        e.preventDefault();
       
        toast.success("Message sent successfully! We will contact you soon.");
        e.target.reset();
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Helmet>
                <title>Contact Us | Garments Tracker</title>
            </Helmet>

           
            <div className="bg-blue-600 text-white py-16 text-center px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Get in Touch</h1>
                <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                    Have questions about the tracking system? Need support or want to schedule a demo?
                    Our team is here to help you streamline your production.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12 -mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* ================= LEFT: CONTACT INFO CARD ================= */}
                    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col justify-between h-full">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
                            <p className="text-slate-500 mb-8">
                                Feel free to visit our office or contact us via email/phone. We usually respond within 24 hours.
                            </p>

                            <div className="space-y-6">
                                {/* Address */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-lg shrink-0">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Head Office</h3>
                                        <p className="text-slate-500 text-sm">
                                            123 Garment Ave, Fashion City, <br />
                                            Dhaka, Bangladesh - 1216
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-lg shrink-0">
                                        <FaEnvelope />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Email Us</h3>
                                        <p className="text-slate-500 text-sm">support@garmentstracker.com</p>
                                        <p className="text-slate-500 text-sm">info@garmentstracker.com</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-lg shrink-0">
                                        <FaPhoneAlt />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Call Us</h3>
                                        <p className="text-slate-500 text-sm">+880 1700 123 456</p>
                                        <p className="text-slate-500 text-sm">+880 1800 987 654</p>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center text-lg shrink-0">
                                        <FaClock />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Working Hours</h3>
                                        <p className="text-slate-500 text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                        <p className="text-slate-500 text-sm">Sat - Sun: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= RIGHT: MESSAGE FORM ================= */}
                    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
                        <form onSubmit={handleSendMessage} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label text-slate-600 font-medium text-sm">Your Name</label>
                                    <input type="text" placeholder="John Doe" className="input input-bordered w-full focus:border-blue-500 focus:outline-none bg-slate-50" required />
                                </div>
                                <div className="form-control">
                                    <label className="label text-slate-600 font-medium text-sm">Email Address</label>
                                    <input type="email" placeholder="john@example.com" className="input input-bordered w-full focus:border-blue-500 focus:outline-none bg-slate-50" required />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label text-slate-600 font-medium text-sm">Subject</label>
                                <input type="text" placeholder="Regarding order tracking..." className="input input-bordered w-full focus:border-blue-500 focus:outline-none bg-slate-50" />
                            </div>

                            <div className="form-control">
                                <label className="label text-slate-600 font-medium text-sm">Message</label>
                                <textarea className="textarea textarea-bordered h-32 w-full focus:border-blue-500 focus:outline-none bg-slate-50" placeholder="Write your message here..." required></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary w-full text-lg font-medium mt-2">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* ================= MAP SECTION ================= */}
                <div className="mt-12">
                    <div className="bg-white p-2 border border-slate-200 rounded-xl shadow-sm h-[300px] w-full overflow-hidden">
                        {/* Google Map Embed (Placeholder location: Dhaka) */}
                        <iframe
                            title="Office Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902442430139!2d90.39108031536267!3d23.750858094680844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b888ad3f988d%3A0x82c7811e041cb336!2sTejgaon%20Industrial%20Area%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1646736473284!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
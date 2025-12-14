import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
import { Carousel } from "react-responsive-carousel";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const FeedbackSection = () => {
    
    const feedbacks = [
        {
            id: 1,
            quote: "GarmentsTracker has helped us improve on-time delivery significantly. The production overview is super helpful for our daily meetings.",
            name: "Maya Thompson",
            role: "Production Head",
            company: "Dhaka Apparel Ltd",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
        },
        {
            id: 2,
            quote: "Tracking cutting, sewing, and finishing stages became incredibly easy. Our team is now more organized than ever before.",
            name: "Rahim Ahmed",
            role: "Factory Manager",
            company: "Gazipur Knit Factory",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
        },
        {
            id: 3,
            quote: "The dashboard is clean and user-friendly. I can track my orders anytime without depending on email updates from the factory.",
            name: "Oliver Carter",
            role: "Senior Buyer",
            company: "Global Brands, Uttara",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
        }
    ];

    return (
        <section className="bg-slate-50 py-12 px-4 rounded-3xl my-8">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                <h2 className="text-3xl font-bold text-slate-900">
                    Trusted by Industry Leaders
                </h2>
                <p className="text-slate-500">
                    See what managers and buyers are saying about their experience with GarmentsTracker.
                </p>
            </div>

            {/* Carousel Section */}
            <div className="max-w-4xl mx-auto">
                <Carousel
                    showArrows={false} // মডার্ন লুকের জন্য অ্যারো বন্ধ রাখলাম, আপনি চাইলে true করতে পারেন
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    interval={4000}
                    stopOnHover={true}
                    className="pb-10" // ডট ইন্ডিকেটরের জন্য জায়গা
                >
                    {feedbacks.map((item) => (
                        <div key={item.id} className="p-4">
                            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-10 relative text-left">
                                {/* Decorative Quote Icon */}
                                <FaQuoteLeft className="text-6xl text-blue-50 absolute top-6 left-6 -z-0" />

                                <div className="relative z-10 space-y-6">
                                    {/* Stars */}
                                    <div className="flex text-orange-400 gap-1 text-sm">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                    </div>

                                    {/* Quote Text */}
                                    <p className="text-slate-600 text-lg leading-relaxed italic">
                                        "{item.quote}"
                                    </p>

                                    <div className="border-t border-slate-100 my-4"></div>

                                    {/* User Profile */}
                                    <div className="flex items-center gap-4">
                                        <div className="avatar">
                                            <div className="w-12 h-12 rounded-full ring ring-blue-50 ring-offset-2">
                                                <img src={item.image} alt={item.name} className="object-cover" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-base">
                                                {item.name}
                                            </h4>
                                            <p className="text-xs text-slate-500">
                                                {item.role}, <span className="text-blue-600 font-medium">{item.company}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

export default FeedbackSection;
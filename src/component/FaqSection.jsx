import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const FaqSection = () => {
    return (
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-10">
                {/* Left Side */}
                <div className="md:w-1/3 space-y-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl">
                        <FaQuestionCircle />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">
                        Frequently Asked <br /> Questions
                    </h2>
                    <p className="text-slate-500">
                        Can’t find the answer you’re looking for? Chat with our support team.
                    </p>
                    <button className="btn btn-primary rounded-full px-6">Contact Support</button>
                </div>

                {/* Right Side - Accordion */}
                <div className="md:w-2/3 space-y-4">
                    <div className="collapse collapse-plus bg-slate-50 border border-slate-100 rounded-xl">
                        <input type="radio" name="my-accordion-3" defaultChecked />
                        <div className="collapse-title text-lg font-medium text-slate-800">
                            How do I track my bulk order?
                        </div>
                        <div className="collapse-content text-slate-600">
                            <p>Once you log in as a buyer, go to the "Track Order" page. Enter your Order ID, and you will see a real-time timeline of cutting, sewing, and shipment status.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-slate-50 border border-slate-100 rounded-xl">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-lg font-medium text-slate-800">
                            Can I request a sample before bulk production?
                        </div>
                        <div className="collapse-content text-slate-600">
                            <p>Yes! You can contact the manager through the "Contact Us" page or request a sample directly from the product details page before placing a large order.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-slate-50 border border-slate-100 rounded-xl">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-lg font-medium text-slate-800">
                            What payment methods do you accept?
                        </div>
                        <div className="collapse-content text-slate-600">
                            <p>We accept Cash on Delivery for local orders and PayFirst (Online Payment) via Stripe for international or secure transactions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
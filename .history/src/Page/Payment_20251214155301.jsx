import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../Hook /useAxiosSecure";

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

   
    const orderData = location.state?.orderData;

    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

  
    useEffect(() => {
        if (!orderData) {
            toast.error("No order data found for payment.");
            navigate("/dashboard/my-orders");
            return;
        }

        // Backend থেকে Payment Intent তৈরি
        const createIntent = async () => {
            try {
                const res = await axiosSecure.post("/create-payment-intent", {
                    amount: orderData.orderPrice, // total price
                    currency: "usd",
                });
                setClientSecret(res.data.clientSecret);
            } catch (err) {
                console.error(err);
                toast.error("Failed to initialize payment");
            }
        };

        createIntent();
    }, [orderData, navigate, axiosSecure]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            return;
        }

        setLoading(true);

        const card = elements.getElement(CardElement);
        if (!card) {
            toast.error("Card element not found");
            setLoading(false);
            return;
        }

        try {
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                },
            });

            if (error) {
                console.error(error);
                toast.error(error.message || "Payment failed");
                setLoading(false);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                toast.success("Payment successful!");

                // এখন order database এ save করবো (status = 'paid')
                try {
                    const res = await axiosSecure.post("/orders", {
                        ...orderData,
                        status: "approved",          // চাইলে 'paid' লিখতে পারো
                        paymentStatus: "paid",
                        stripePaymentId: paymentIntent.id,
                    });

                    if (res.data.insertedId) {
                        toast.success("Order saved!");
                    }
                } catch (err) {
                    console.error("Order save error:", err);
                    toast.error("Payment done, but failed to save order");
                }

                // My Orders এ পাঠিয়ে দিই
                navigate("/dashboard/my-orders");
            }
        } catch (err) {
            console.error(err);
            toast.error("Payment processing failed");
        } finally {
            setLoading(false);
        }
    };

    if (!orderData) {
        return null;
    }

    return (
        <div className="max-w-md mx-auto space-y-4">
            <h1 className="text-xl font-semibold text-slate-900">Complete Payment</h1>
            <p className="text-sm text-slate-500">
                Product: <span className="font-medium">{orderData.productName}</span>
            </p>
            <p className="text-sm text-slate-700">
                Total Amount: <span className="font-bold">${orderData.orderPrice}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-xl border">
                <div className="border rounded-md p-3">
                    <CardElement />
                </div>

                <button
                    type="submit"
                    disabled={!stripe || !clientSecret || loading}
                    className="btn btn-primary w-full"
                >
                    {loading ? "Processing..." : "Pay Now"}
                </button>
            </form>
        </div>
    );
};

export default Payment;

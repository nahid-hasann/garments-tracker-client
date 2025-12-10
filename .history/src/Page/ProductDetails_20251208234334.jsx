import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams(); // /products/:id theke id pabo
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [quantity, setQuantity] = useState("");
    const {user}


    useEffect(() => {
        const loadProduct = async () => {
            try {
                setError("");
                const res = await axios.get(`http://localhost:8000/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Error loading product:", err);
                setError("Could not load product details.");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-2">
                <p className="text-sm text-red-500 font-medium">
                    {error || "Product not found."}
                </p>
                <Link
                    to="/all-products"
                    className="text-xs text-blue-600 hover:text-blue-700"
                >
                    ← Back to all products
                </Link>
            </div>
        );
    }

    const {
        name,
        description,
        image,
        category,
        price,
        availableQty,
        minQty,
        paymentOptions,
        buyerName,
    } = product;

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Back link */}
            <div className="flex items-center justify-between text-xs mb-2">
                <Link
                    to="/all-products"
                    className="text-blue-600 hover:text-blue-700"
                >
                    ← Back to all products
                </Link>
                <p className="text-slate-400">
                    Product ID: <span className="font-mono">{id}</span>
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 bg-white border border-slate-100 rounded-2xl shadow-sm p-4 md:p-6">
                {/* Image side */}
                <div className="space-y-3">
                    <div className="w-full h-64 bg-slate-100 rounded-xl overflow-hidden">
                        {image ? (
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                                No product image added
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs space-y-1">
                        <p className="font-semibold text-slate-800">Production snapshot</p>
                        <p className="text-slate-500">
                            This panel will later show order quantity, booked quantity, and
                            production status for this specific product.
                        </p>
                    </div>
                </div>

                {/* Details side */}
                <div className="space-y-4">
                    <div>
                        <p className="text-xs uppercase tracking-wide text-blue-600 mb-1">
                            Product Details
                        </p>
                        <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                            {name || "Unnamed product"}
                        </h1>
                        {buyerName && (
                            <p className="text-xs text-slate-500 mt-1">
                                Buyer: <span className="font-medium">{buyerName}</span>
                            </p>
                        )}
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                        {description ||
                            "No detailed description has been added for this product yet. Later you can store fabric type, GSM, size range, color breakdown and wash details here."}
                    </p>

                    {/* Meta info grid */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
                            <p className="text-[11px] text-slate-500">Category</p>
                            <p className="font-semibold text-slate-900 mt-0.5">
                                {category || "Not set"}
                            </p>
                        </div>
                        <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
                            <p className="text-[11px] text-slate-500">Price</p>
                            <p className="font-semibold text-blue-600 mt-0.5">
                                {price ? `$${price}` : "On negotiation"}
                            </p>
                        </div>
                        <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
                            <p className="text-[11px] text-slate-500">Available quantity</p>
                            <p className="font-semibold text-slate-900 mt-0.5">
                                {availableQty ?? "Not set"}
                            </p>
                        </div>
                        <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
                            <p className="text-[11px] text-slate-500">
                                Minimum order quantity
                            </p>
                            <p className="font-semibold text-slate-900 mt-0.5">
                                {minQty ?? "Not set"}
                            </p>
                        </div>
                    </div>

                    {/* Payment options */}
                    <div className="rounded-lg bg-slate-50 border border-slate-100 p-3 text-sm">
                        <p className="text-[11px] text-slate-500 font-medium mb-1">
                            Payment options
                        </p>
                        <p className="text-slate-700">
                            {paymentOptions === "cod"
                                ? "Cash on Delivery"
                                : paymentOptions === "payfast"
                                    ? "PayFast – online payment"
                                    : "Payment method will be defined by manager."}
                        </p>
                    </div>

                    {/* Order / Booking button (UI only, later form add করব) */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        <button
                        onClick={() => setOpenModal(true)}
                            type="button"
                            className="flex-1 rounded-full bg-blue-600 text-white text-sm font-semibold py-2.5 hover:bg-blue-700 transition-colors"
                        >
                            Book / Place Order
                        </button>

                        <button
                            type="button"
                            className="rounded-full border border-slate-200 text-slate-700 text-xs px-4 py-2 hover:border-blue-500 hover:text-blue-600"
                        >
                            View tracking timeline (coming soon)
                        </button>
                    </div>


                    <p className="text-[11px] text-slate-400">
                        Later: এই page theke buyer order quantity select করে booking form e
                        যাবে, আর manager/admin order approval / tracking manage করবে.
                    </p>
                </div>
            </div>
            <div>
                {/* ====== ORDER BOOKING MODAL ====== */}
                {openModal && (
                    <dialog open className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box space-y-4">

                            <h3 className="text-lg font-semibold text-slate-800">
                                Book / Place Order
                            </h3>

                            <form onSubmit={handleOrderSubmit} className="space-y-3">

                                {/* Buyer Name */}
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500">Buyer Name</label>
                                    <input
                                        type="text"
                                        value={user?.displayName}
                                        readOnly
                                        className="input input-bordered w-full text-sm"
                                    />
                                </div>

                                {/* Buyer Email */}
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500">Buyer Email</label>
                                    <input
                                        type="email"
                                        value={user?.email}
                                        readOnly
                                        className="input input-bordered w-full text-sm"
                                    />
                                </div>

                                {/* Product Name */}
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500">Product Name</label>
                                    <input
                                        type="text"
                                        value={product?.name}
                                        readOnly
                                        className="input input-bordered w-full text-sm"
                                    />
                                </div>

                                {/* Quantity Input */}
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500">Order Quantity</label>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        placeholder="Enter quantity..."
                                        required
                                        className="input input-bordered w-full text-sm"
                                    />
                                </div>

                                {/* Message Input */}
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500">Message (optional)</label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Any additional notes..."
                                        className="textarea textarea-bordered w-full text-sm"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full text-sm"
                                >
                                    Confirm Order
                                </button>
                            </form>

                            {/* Close button */}
                            <div className="modal-action">
                                <button
                                    className="btn btn-sm"
                                    onClick={() => setOpenModal(false)}
                                >
                                    Close
                                </button>
                            </div>

                        </div>
                    </dialog>
                )}

            </div>
        </div>
    );
};

export default ProductDetails;

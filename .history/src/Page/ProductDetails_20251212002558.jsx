import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../Hook /useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const ProductDetails = () => {
    const { id } = useParams(); // /products/:id theke id pabo
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [openModal, setOpenModal] = useState(false);

    // booking form states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [orderPrice, setOrderPrice] = useState(0);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");

    // 🔹 DB user status (pending/active/suspended)
    const [userStatus, setUserStatus] = useState("pending");

    const { user, role } = useAuth();

    // 👉 product load
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

    // 👉 logged in user-er DB status load (users collection theke)
    useEffect(() => {
        const loadDbUser = async () => {
            if (!user?.email) return;

            try {
                const res = await axios.get(
                    `http://localhost:8000/users?email=${user.email}`
                );
                setUserStatus(res.data?.status || "pending");
            } catch (err) {
                console.error("Failed to load db user:", err);
                setUserStatus("pending");
            }
        };

        loadDbUser();
    }, [user?.email]);

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

    // product theke value gula
    const {
        name,
        description,
        image,
        category,
        price,
        availableQty,
        minQty,
        paymentOptions,
    } = product;

    // fallback fields (quantity / minimumOrder / paymentMode)
    const availableQuantity = availableQty ?? product.quantity ?? 0;
    const minOrderQty = minQty ?? product.minimumOrder ?? 0;
    const rawPaymentMode = product.paymentMode ?? paymentOptions ?? "not-set";

    // payment info derive
    let paymentInfoText = "Payment method will be defined by manager.";
    let requiresOnlinePayment = false;
    let paymentMethodForOrder = "Not set";

    if (/payfirst|payfast/i.test(rawPaymentMode)) {
        paymentInfoText = "PayFirst – online payment";
        requiresOnlinePayment = true;
        paymentMethodForOrder = "PayFirst";
    } else if (/cash/i.test(rawPaymentMode) || rawPaymentMode === "cod") {
        paymentInfoText = "Cash on Delivery";
        requiresOnlinePayment = false;
        paymentMethodForOrder = "Cash on Delivery";
    }

    // 👉 role + status ভিত্তিক permission
    const isBuyer = role === "buyer";
    const isActive = userStatus === "active";
    const canOrder = !!user && isBuyer && isActive;

    // quantity change hole price auto calculate
    const handleQuantityChange = (e) => {
        const val = e.target.value;
        setQuantity(val);

        const qtyNum = parseInt(val);
        const unitPrice = Number(price) || 0;

        if (!isNaN(qtyNum) && qtyNum > 0 && unitPrice > 0) {
            setOrderPrice(qtyNum * unitPrice);
        } else {
            setOrderPrice(0);
        }
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault(); // form reload বন্ধ

        if (!user) {
            toast.error("Please login to place order.");
            return;
        }

        if (!canOrder) {
            toast.error("You are not allowed to place orders.");
            return;
        }

        const qtyNum = parseInt(quantity);
        const stockNum = Number(availableQuantity) || 0;
        const minNum = Number(minOrderQty) || 0;

        // validation: quantity check
        if (isNaN(qtyNum) || qtyNum <= 0) {
            toast.error("Please enter a valid quantity.");
            return;
        }

        if (minNum && qtyNum < minNum) {
            toast.error(`Quantity cannot be less than minimum order (${minNum}).`);
            return;
        }

        if (stockNum && qtyNum > stockNum) {
            toast.error(
                `Quantity cannot be larger than available stock (${stockNum}).`
            );
            return;
        }

        const totalPrice = (Number(price) || 0) * qtyNum;

        const order = {
            buyerName:
                `${firstName} ${lastName}`.trim() || user.displayName || "Buyer",
            buyerEmail: user.email,
            productId: product._id,
            productName: product.name,
            quantity: qtyNum,
            orderPrice: totalPrice,
            contactNumber: phone,
            address,
            notes: message,
            paymentMethod: paymentMethodForOrder, // "Cash on Delivery" / "PayFirst"
            paymentStatus: requiresOnlinePayment ? "unpaid" : "cod", // later Stripe হলে "paid"
            status: "pending",
            createdAt: new Date(),
        };

        // যদি online payment লাগে → আগে payment page e যাও
        if (requiresOnlinePayment) {
            navigate("/paymen", { state: { orderData: order } });
            setOpenModal(false);
            return;
        }

        // Cash on Delivery হলে direct order save
        try {
            const res = await axios.post("http://localhost:8000/orders", order);

            if (res.data.insertedId) {
                toast.success("Order placed successfully (Cash on Delivery)!");
            } else {
                toast.success("Order submitted!");
            }

            // modal close + reset
            setOpenModal(false);
            setFirstName("");
            setLastName("");
            setQuantity("");
            setOrderPrice(0);
            setPhone("");
            setAddress("");
            setMessage("");
        } catch (err) {
            console.log(err);
            toast.error("Failed to place order");
        }
    };

    // 👉 Button text different case অনুযায়ী
    const getOrderButtonText = () => {
        if (!user) return "Login to place order";
        if (!isBuyer) return "Only buyers can place order";
        if (userStatus === "pending") return "Account pending approval";
        if (userStatus === "suspended" || userStatus === "blocked")
            return "Account suspended";
        if (!isActive) return "Account not active";
        return "Book / Place Order";
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <Helmet>
                <title>
                    {product?.name ? `${product.name} | Details` : "Product Details"}
                </title>
            </Helmet>

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
                            <p className="text-[11px] text-slate-500">Unit Price</p>
                            <p className="font-semibold text-blue-600 mt-0.5">
                                {price ? `$${price}` : "On negotiation"}
                            </p>
                        </div>
                        <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
                            <p className="text-[11px] text-slate-500">Available quantity</p>
                            <p className="font-semibold text-slate-900 mt-0.5">
                                {availableQuantity ?? "Not set"}
                            </p>
                        </div>
                        <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
                            <p className="text-[11px] text-slate-500">
                                Minimum order quantity
                            </p>
                            <p className="font-semibold text-slate-900 mt-0.5">
                                {minOrderQty || "Not set"}
                            </p>
                        </div>
                    </div>

                    {/* Payment options */}
                    <div className="rounded-lg bg-slate-50 border border-slate-100 p-3 text-sm">
                        <p className="text-[11px] text-slate-500 font-medium mb-1">
                            Payment options
                        </p>
                        <p className="text-slate-700">{paymentInfoText}</p>
                    </div>

                    {/* Order / Booking button */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={() => canOrder && setOpenModal(true)}
                            disabled={!canOrder}
                            className={`flex-1 rounded-full text-sm font-semibold py-2.5 transition-colors ${canOrder
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-slate-200 text-slate-500 cursor-not-allowed"
                                }`}
                        >
                            {getOrderButtonText()}
                        </button>

                        <button
                            type="button"
                            className="rounded-full border border-slate-200 text-slate-700 text-xs px-4 py-2 hover:border-blue-500 hover:text-blue-600"
                        >
                            View tracking timeline (coming soon)
                        </button>
                    </div>

                </div>
            </div>

            {/* ====== ORDER BOOKING MODAL ====== */}
            {openModal && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800">
                            Book / Place Order
                        </h3>

                        <form onSubmit={handleOrderSubmit} className="space-y-3">
                            {/* Email (read-only) */}
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">Buyer Email</label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className="input input-bordered w-full text-sm bg-slate-50"
                                />
                            </div>

                            {/* Product Title (read-only) */}
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">Product Title</label>
                                <input
                                    type="text"
                                    value={product?.name || ""}
                                    readOnly
                                    className="input input-bordered w-full text-sm bg-slate-50"
                                />
                            </div>

                            {/* Price / Payment Info (read-only) */}
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">
                                    Price & Payment Info
                                </label>
                                <input
                                    type="text"
                                    value={`Unit: $${price || 0} • ${paymentInfoText}`}
                                    readOnly
                                    className="input input-bordered w-full text-sm bg-slate-50"
                                />
                            </div>

                            {/* First & Last Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500">First Name</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First name"
                                        required
                                        className="input input-bordered w-full text-sm"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500">Last Name</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last name"
                                        required
                                        className="input input-bordered w-full text-sm"
                                    />
                                </div>
                            </div>

                            {/* Quantity + Info */}
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">Order Quantity</label>
                                <input
                                    type="number"
                                    min={minOrderQty || 1}
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    placeholder="Enter quantity..."
                                    required
                                    className="input input-bordered w-full text-sm"
                                />
                                <p className="text-[11px] text-slate-400">
                                    Min:{" "}
                                    <span className="font-semibold">
                                        {minOrderQty || "N/A"}
                                    </span>{" "}
                                    • Max:{" "}
                                    <span className="font-semibold">
                                        {availableQuantity || "N/A"}
                                    </span>
                                </p>
                            </div>

                            {/* Order Price (read-only) */}
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">
                                    Order Price (auto)
                                </label>
                                <input
                                    type="text"
                                    value={
                                        orderPrice > 0
                                            ? `$${orderPrice}`
                                            : "Will calculate automatically"
                                    }
                                    readOnly
                                    className="input input-bordered w-full text-sm bg-slate-50"
                                />
                            </div>

                            {/* Contact Number */}
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">
                                    Contact Number
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="e.g. +8801XXXXXXXXX"
                                    required
                                    className="input input-bordered w-full text-sm"
                                />
                            </div>

                            {/* Delivery Address */}
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">
                                    Delivery Address
                                </label>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Factory / office delivery address..."
                                    required
                                    className="textarea textarea-bordered w-full text-sm"
                                ></textarea>
                            </div>

                            {/* Notes */}
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">
                                    Additional Notes / Instructions
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Any size breakdown, color details, shipment preference..."
                                    className="textarea textarea-bordered w-full text-sm"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <Link to=''>
                            
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full text-sm"
                                >
                                    Confirm Order
                                </button>
                            </Link>
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
    );
};

export default ProductDetails;

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import useAuth from "../Hook/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hook/useAxiosSecure";
import SkeletonCard from "../component/SkeletonCard";
import { FaCheckCircle, FaTag, FaBox } from 'react-icons/fa';
import useAuth from "../Hook /useAuth";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Related Products State
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [relatedLoading, setRelatedLoading] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [orderPrice, setOrderPrice] = useState(0);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");

    const [userStatus, setUserStatus] = useState("pending");
    const { user, role } = useAuth();

    // 1. Load Main Product
    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await axiosSecure.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Error loading product:", err);
                setError("Could not load product details.");
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id, axiosSecure]);

    // 2. Load Related Products (When product is loaded)
    useEffect(() => {
        const loadRelated = async () => {
            if (product?.category) {
                setRelatedLoading(true);
                try {
                    const res = await axiosSecure.get(`/products?category=${product.category}&limit=4`);
                    const allRelated = res.data.products || [];
                    // Filter out current product
                    setRelatedProducts(allRelated.filter(item => item._id !== id).slice(0, 3));
                } catch (err) {
                    console.error("Failed to load related products", err);
                } finally {
                    setRelatedLoading(false);
                }
            }
        };
        loadRelated();
    }, [product, id, axiosSecure]);

    // 3. Load User Status
    useEffect(() => {
        const loadDbUser = async () => {
            if (!user?.email) return;
            try {
                const res = await axiosSecure.get(`/users?email=${user.email}`);
                setUserStatus(res.data?.status || "pending");
            } catch (err) {
                console.error("Failed to load db user:", err);
                setUserStatus("pending");
            }
        };
        loadDbUser();
    }, [user?.email, axiosSecure]);

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
                <p className="text-sm text-red-500 font-medium">{error || "Product not found."}</p>
                <Link to="/all-products" className="text-xs text-blue-600 hover:text-blue-700">← Back to all products</Link>
            </div>
        );
    }

    const { name, description, image, category, price, availableQty, minQty, paymentOptions } = product;

    const availableQuantity = availableQty ?? product.quantity ?? 0;
    const minOrderQty = minQty ?? product.minimumOrder ?? 0;
    const rawPaymentMode = product.paymentMode ?? paymentOptions ?? "not-set";

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

    const isBuyer = role === "buyer";
    const isActive = userStatus === "active";
    const canOrder = !!user && isBuyer && isActive;

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
        e.preventDefault();
        if (!user) { toast.error("Please login to place order."); return; }
        if (!canOrder) { toast.error("You are not allowed to place orders."); return; }

        const qtyNum = parseInt(quantity);
        const stockNum = Number(availableQuantity) || 0;
        const minNum = Number(minOrderQty) || 0;

        if (isNaN(qtyNum) || qtyNum <= 0) { toast.error("Please enter a valid quantity."); return; }
        if (minNum && qtyNum < minNum) { toast.error(`Quantity cannot be less than minimum order (${minNum}).`); return; }
        if (stockNum && qtyNum > stockNum) { toast.error(`Quantity cannot be larger than available stock (${stockNum}).`); return; }

        const totalPrice = (Number(price) || 0) * qtyNum;

        const order = {
            buyerName: `${firstName} ${lastName}`.trim() || user.displayName || "Buyer",
            buyerEmail: user.email,
            productId: product._id,
            productName: product.name,
            quantity: qtyNum,
            orderPrice: totalPrice,
            contactNumber: phone,
            address,
            notes: message,
            paymentMethod: paymentMethodForOrder,
            paymentStatus: requiresOnlinePayment ? "unpaid" : "cod",
            status: "pending",
            createdAt: new Date(),
        };

        if (requiresOnlinePayment) {
            navigate("/dashboard/payment", { state: { orderData: order } });
            setOpenModal(false);
            return;
        }

        try {
            const res = await axiosSecure.post("/orders", order);
            if (res.data.insertedId) {
                toast.success("Order placed successfully (Cash on Delivery)!");
            } else {
                toast.success("Order submitted!");
            }
            setOpenModal(false);
            setFirstName(""); setLastName(""); setQuantity(""); setOrderPrice(0); setPhone(""); setAddress(""); setMessage("");
        } catch (err) {
            console.log(err);
            toast.error("Failed to place order");
        }
    };

    const getOrderButtonText = () => {
        if (!user) return "Login to place order";
        if (!isBuyer) return "Only buyers can place order";
        if (userStatus === "pending") return "Account pending approval";
        if (userStatus === "suspended" || userStatus === "blocked") return "Account suspended";
        if (!isActive) return "Account not active";
        return "Book / Place Order";
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-12">
            <Helmet>
                <title>{name ? `${name} | Details` : "Product Details"}</title>
            </Helmet>

            {/* --- Breadcrumb --- */}
            <div className="text-sm breadcrumbs text-slate-500">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/all-products">Products</Link></li>
                    <li className="font-semibold text-slate-800">{name}</li>
                </ul>
            </div>

            {/* --- Main Product Section --- */}
            <div className="grid md:grid-cols-2 gap-10 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100">

                {/* Image Gallery Side */}
                <div className="space-y-4">
                    <div className="relative aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 group">
                        {image ? (
                            <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                        )}
                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm border border-blue-50">
                            {category || 'Apparel'}
                        </span>
                    </div>
                    <div className="flex gap-2 text-xs text-slate-500 bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <FaBox className="text-blue-500 mt-0.5" />
                        <p>Production snapshot: Real-time tracking available after order placement.</p>
                    </div>
                </div>

                {/* Details Side */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 leading-tight">{name || "Unnamed product"}</h1>
                        <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                            {description || "No detailed description available. This premium quality garment is ready for bulk production."}
                        </p>
                    </div>

                    {/* Price & Specs */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Unit Price</p>
                                <p className="text-3xl font-bold text-blue-600">{price ? `$${price}` : "Negotiable"}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Min Order</p>
                                <p className="text-xl font-bold text-slate-800">{minOrderQty} pcs</p>
                            </div>
                        </div>
                        <div className="h-[1px] bg-slate-200 w-full"></div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Available Stock:</span>
                            <span className="font-bold text-slate-900">{availableQuantity} pcs</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Payment:</span>
                            <span className="font-bold text-slate-900">{paymentInfoText}</span>
                        </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2">
                        <h3 className="font-bold text-sm text-slate-900">Product Highlights:</h3>
                        <ul className="space-y-1 text-sm text-slate-600">
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> Premium Fabric Quality</li>
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> Export Standard Stitching</li>
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> Fast Sample Delivery</li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={() => canOrder && setOpenModal(true)}
                            disabled={!canOrder}
                            className={`flex-1 btn rounded-full shadow-lg shadow-blue-100 border-none text-white ${canOrder ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-300 cursor-not-allowed'}`}
                        >
                            {getOrderButtonText()}
                        </button>
                        <button className="btn btn-outline rounded-full border-slate-200 text-slate-600 hover:bg-slate-50">
                            <FaTag /> Request Sample
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Related Products Section (NEW) --- */}
            <div className="space-y-6 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">Related Products</h2>
                    <Link to="/all-products" className="text-sm font-semibold text-blue-600 hover:underline">View All</Link>
                </div>

                {relatedLoading ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, idx) => <SkeletonCard key={idx} />)}
                    </div>
                ) : relatedProducts.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500">
                        No related products found in this category.
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {relatedProducts.map(item => (
                            <Link to={`/products/${item._id}`} key={item._id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all group block">
                                <div className="h-48 bg-slate-100 overflow-hidden relative">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <span className="absolute bottom-2 right-2 bg-white/90 px-2 py-0.5 text-[10px] font-bold rounded shadow-sm">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="p-4 space-y-2">
                                    <h3 className="font-bold text-slate-900 truncate">{item.name}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-blue-600 font-bold">${item.price}</span>
                                        <span className="text-xs text-slate-500">Min: {item.minQty || 100}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* --- Order Modal (Kept Existing Logic) --- */}
            {openModal && (
                <dialog open className="modal modal-bottom sm:modal-middle bg-slate-900/50 backdrop-blur-sm">
                    <div className="modal-box space-y-4">
                        <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">
                            Place Your Order
                        </h3>
                        <form onSubmit={handleOrderSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
                            {/* Read-Only Info */}
                            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
                                <div><p className="text-slate-500">Buyer:</p><p className="font-semibold">{user?.email}</p></div>
                                <div><p className="text-slate-500">Product:</p><p className="font-semibold">{product?.name}</p></div>
                            </div>

                            {/* Inputs */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="form-control"><label className="label-text text-xs mb-1">First Name</label><input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="input input-sm input-bordered" /></div>
                                <div className="form-control"><label className="label-text text-xs mb-1">Last Name</label><input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="input input-sm input-bordered" /></div>
                            </div>

                            <div className="form-control">
                                <label className="label-text text-xs mb-1">Quantity (Min: {minOrderQty})</label>
                                <input type="number" min={minOrderQty || 1} value={quantity} onChange={handleQuantityChange} required className="input input-sm input-bordered" />
                                <label className="label-text-alt text-blue-600 font-semibold mt-1">Total: ${orderPrice > 0 ? orderPrice : 0}</label>
                            </div>

                            <div className="form-control"><label className="label-text text-xs mb-1">Phone Number</label><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="input input-sm input-bordered" /></div>
                            <div className="form-control"><label className="label-text text-xs mb-1">Delivery Address</label><textarea value={address} onChange={(e) => setAddress(e.target.value)} required className="textarea textarea-sm textarea-bordered h-20"></textarea></div>
                            <div className="form-control"><label className="label-text text-xs mb-1">Notes (Optional)</label><textarea value={message} onChange={(e) => setMessage(e.target.value)} className="textarea textarea-sm textarea-bordered"></textarea></div>

                            <button type="submit" className="btn btn-primary w-full text-white">Confirm Order (${orderPrice})</button>
                        </form>
                        <div className="modal-action mt-0">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setOpenModal(false)}>✕</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ProductDetails;
import React from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hook /useAxiosSecure";
import useAuth from "../Hook /useAuth";

const AddProduct = () => {
    const axiosSecure = useAxiosSecure();
    const { userStatus } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // 🔥 BLOCKED VIEW
    if (userStatus === 'suspended') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                <Helmet>
                    <title>Access Denied</title>
                </Helmet>
                <div className="text-red-500 text-6xl">🚫</div>
                <h2 className="text-2xl font-bold text-slate-800">Access Restricted</h2>
                <p className="text-slate-500 max-w-md">
                    Your account has been <span className="text-red-500 font-bold">SUSPENDED</span>.
                </p>
            </div>
        );
    }

    // ✅ ফর্ম সাবমিট ফাংশন
    const onSubmit = async (data) => {

        // 1. ডাটা সাজানো (Description সহ)
        const newProduct = {
            name: data.name,
            image: data.image,
            buyerName: data.buyerName,
            category: data.category,
            price: parseFloat(data.price),
            minQty: parseInt(data.minQty),
            availableQty: parseInt(data.availableQty),
            paymentOptions: data.paymentOptions,
            showOnHome: data.showOnHome,
            description: data.description, // ✅ এই যে ডেসক্রিপশন অ্যাড করা হলো
            createdAt: new Date().toISOString() // সাথে সময়টাও দিয়ে দিলাম
        };

        try {
            // 2. সার্ভারে পাঠানো
            const res = await axiosSecure.post("/products", newProduct);
            if (res.data.insertedId || res.data.acknowledged) {
                toast.success("Product added successfully!");
                reset();
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to add product");
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <Helmet>
                <title>Add Product | Manager Panel</title>
            </Helmet>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Add New Product</h2>
                <p className="text-sm text-slate-500">Fill in the details to add a new garment item.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">

                {/* Name */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Product Name*</span></label>
                    <input
                        {...register("name", { required: "Product Name is required" })}
                        type="text"
                        placeholder="e.g. Cotton T-Shirt"
                        className="input input-bordered w-full"
                    />
                    {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Buyer */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Buyer Name</span></label>
                        <input {...register("buyerName")} type="text" placeholder="e.g. H&M" className="input input-bordered w-full" />
                    </div>

                    {/* Category */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Category*</span></label>
                        <select
                            {...register("category", { required: "Please select a category" })}
                            className="select select-bordered w-full"
                            defaultValue=""
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="t-shirt">T-Shirt</option>
                            <option value="hoodie">Hoodie</option>
                            <option value="denim">Denim</option>
                            <option value="others">Others</option>
                        </select>
                        {errors.category && <span className="text-red-500 text-xs mt-1">{errors.category.message}</span>}
                    </div>
                </div>

                {/* Image */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Image URL</span></label>
                    <input {...register("image")} type="text" placeholder="https://..." className="input input-bordered w-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Price */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Price ($)*</span></label>
                        <input
                            {...register("price", { required: "Price is required", min: 1 })}
                            type="number" step="0.01" placeholder="0.00"
                            className="input input-bordered w-full"
                        />
                        {errors.price && <span className="text-red-500 text-xs mt-1">{errors.price.message}</span>}
                    </div>

                    {/* Min Qty */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Min Order Qty</span></label>
                        <input {...register("minQty")} type="number" placeholder="100" className="input input-bordered w-full" />
                    </div>

                    {/* Available */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Available Stock</span></label>
                        <input {...register("availableQty")} type="number" placeholder="5000" className="input input-bordered w-full" />
                    </div>
                </div>

                {/* Payment Options */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Payment Options</span></label>
                    <select {...register("paymentOptions")} className="select select-bordered w-full">
                        <option value="cod">Cash On Delivery</option>
                        <option value="payfast">PayFirst (Online)</option>
                    </select>
                </div>

                {/* ✅ DESCRIPTION FIELD (NEW) */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Description*</span></label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="textarea textarea-bordered h-24"
                        placeholder="Write detailed product description here..."
                    ></textarea>
                    {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>}
                </div>

                {/* Checkbox */}
                <div className="form-control">
                    <label className="cursor-pointer flex items-center gap-3 p-2 border rounded-lg hover:bg-slate-50">
                        <input {...register("showOnHome")} type="checkbox" className="checkbox checkbox-primary" />
                        <span className="label-text font-medium">Show this product on Home Page</span>
                    </label>
                </div>

                <button type="submit" className="btn btn-primary w-full text-lg">
                    Save Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
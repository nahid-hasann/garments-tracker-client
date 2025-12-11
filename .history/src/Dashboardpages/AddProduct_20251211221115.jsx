import React from "react";
import useAxiosSecure from "../Hook /useAxiosSecure"; // পাথ চেক করুন
import useAuth from "../Hook /useAuth"; // পাথ চেক করুন
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const AddProduct = () => {
    const axiosSecure = useAxiosSecure();
    const { userStatus } = useAuth(); // AuthProvider থেকে স্ট্যাটাস নিচ্ছি

    // 🔥 BLOCKED VIEW (যদি ম্যানেজার Suspended হয়)
    if (userStatus === 'suspended') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                <Helmet>
                    <title>Access Denied</title>
                </Helmet>
                <div className="text-red-500 text-6xl">🚫</div>
                <h2 className="text-2xl font-bold text-slate-800">Access Restricted</h2>
                <p className="text-slate-500 max-w-md">
                    Your account has been <span className="text-red-500 font-bold">SUSPENDED</span> by the admin.
                    You cannot add new products at this time.
                </p>
                <p className="text-sm bg-slate-100 p-2 rounded">
                    Check your <span className="font-semibold">Profile</span> for the suspension reason.
                </p>
            </div>
        );
    }

    // --- আগের মেইন ফাংশন ---
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.value;
        const buyerName = form.buyerName.value;
        const category = form.category.value;
        const price = Number(form.price.value);
        const minQty = Number(form.minQty.value);
        const availableQty = Number(form.availableQty.value);
        const paymentOptions = form.paymentOptions.value;
        const showOnHome = form.showOnHome.checked;

        const newProduct = {
            name, image, buyerName, category, price, minQty, availableQty, paymentOptions, showOnHome,
        };

        try {
            const res = await axiosSecure.post("/products", newProduct);
            if (res.data.insertedId || res.data.acknowledged) {
                toast.success("Product added successfully!");
                form.reset();
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
                <p className="text-sm text-slate-500">Fill in the details to add a new garment item to inventory.</p>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">

                <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Product Name</span></label>
                    <input name="name" type="text" placeholder="e.g. Cotton T-Shirt" className="input input-bordered w-full" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Buyer Name</span></label>
                        <input name="buyerName" type="text" placeholder="e.g. H&M" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Category</span></label>
                        <select name="category" className="select select-bordered w-full">
                            <option value="">Select Category</option>
                            <option value="t-shirt">T-Shirt</option>
                            <option value="hoodie">Hoodie</option>
                            <option value="denim">Denim</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Image URL</span></label>
                    <input name="image" type="text" placeholder="https://..." className="input input-bordered w-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Price ($)</span></label>
                        <input name="price" type="number" placeholder="0.00" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Min Order Qty</span></label>
                        <input name="minQty" type="number" placeholder="100" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Available Stock</span></label>
                        <input name="availableQty" type="number" placeholder="5000" className="input input-bordered w-full" />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Payment Options</span></label>
                    <select name="paymentOptions" className="select select-bordered w-full">
                        <option value="cod">Cash On Delivery</option>
                        <option value="payfast">PayFirst (Online)</option>
                    </select>
                </div>

                <div className="form-control">
                    <label className="cursor-pointer flex items-center gap-3 p-2 border rounded-lg hover:bg-slate-50">
                        <input name="showOnHome" type="checkbox" className="checkbox checkbox-primary" />
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
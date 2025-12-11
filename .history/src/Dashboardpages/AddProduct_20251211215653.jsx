import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hook /useAxiosSecure";

const AddProduct = () => {
    const axiosSecure = useAxiosSecure();

    // ⭐⭐⭐ Handle Add Product Function — ei jaigai bosabe
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
            name,
            image,
            buyerName,
            category,
            price,
            minQty,
            availableQty,
            paymentOptions,
            showOnHome,
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

    // ------------------------------
    // Return Part — Form ekhane thakbe
    // ------------------------------

    return (
        <div className="p-4">
            <Helmet>
                <title>Add Product | Manager Panel</title>
            </Helmet>

            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

            {/* ⭐⭐⭐ Form e onSubmit e function call */}
            <form onSubmit={handleAddProduct} className="space-y-3">

                <input name="name" type="text" placeholder="Product name" className="input input-bordered w-full" />

                <input name="image" type="text" placeholder="Image URL" className="input input-bordered w-full" />

                <input name="buyerName" type="text" placeholder="Buyer name" className="input input-bordered w-full" />

                <select name="category" className="select select-bordered w-full">
                    <option value="">Select Category</option>
                    <option value="t-shirt">T-Shirt</option>
                    <option value="hoodie">Hoodie</option>
                    <option value="denim">Denim</option>
                    <option value="others">Others</option>
                </select>

                <input name="price" type="number" placeholder="Price" className="input input-bordered w-full" />

                <input name="minQty" type="number" placeholder="Minimum Quantity" className="input input-bordered w-full" />

                <input name="availableQty" type="number" placeholder="Available Quantity" className="input input-bordered w-full" />

                <select name="paymentOptions" className="select select-bordered w-full">
                    <option value="cod">Cash On Delivery</option>
                    <option value="payfast">PayFast</option>
                </select>

                <label className="flex items-center gap-2">
                    <input name="showOnHome" type="checkbox" className="checkbox" />
                    Show this product on home page
                </label>

                <button type="submit" className="btn btn-primary w-full">
                    Save Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;

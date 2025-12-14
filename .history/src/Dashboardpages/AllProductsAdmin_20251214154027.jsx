import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook /useAxiosSecure"; 
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllProductsAdmin = () => {
    const axiosSecure = useAxiosSecure();

    
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            
            const res = await axiosSecure.get('/products?limit=1000&page=1');
            
            return res.data.products || [];

            // আর যদি সরাসরি অ্যারে রিটার্ন করে, তবে: return res.data;
        }
    });

    // 🗑️ ডিলিট ফাংশন
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/products/${id}`);
                    if (res.data.deletedCount > 0) {
                        refetch(); // ডাটা রিফ্রেশ হবে
                        Swal.fire("Deleted!", "Product has been deleted.", "success");
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire("Error!", "Failed to delete product.", "error");
                }
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                    Manage All Products: {products.length}
                </h2>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-10 text-slate-500">
                    No products found in the database.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody className="text-sm">
                            {products.map((item, index) => (
                                <tr key={item._id} className="hover:bg-slate-50 transition-colors border-b border-slate-100">
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12 bg-slate-100">
                                                <img src={item.image || "https://via.placeholder.com/50"} alt={item.name} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-medium text-slate-800">
                                        {item.name}
                                    </td>
                                    <td>
                                        <span className="badge badge-ghost badge-sm">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="font-bold text-slate-600">
                                        ${item.price}
                                    </td>
                                    <td>
                                        <div className="flex justify-center gap-3">
                                            {/* Edit Button */}
                                            <Link to={`/dashboard/update-product/${item._id}`}>
                                                <button className="btn btn-sm btn-square btn-ghost text-blue-600 hover:bg-blue-50">
                                                    <FaEdit className="text-lg" />
                                                </button>
                                            </Link>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="btn btn-sm btn-square btn-ghost text-red-500 hover:bg-red-50"
                                            >
                                                <FaTrashAlt className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllProductsAdmin;
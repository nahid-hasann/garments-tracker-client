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
        }
    });

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
                        refetch();
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
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100 gap-4">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                    Manage Products
                </h2>
                <div className="badge badge-primary badge-lg">Total: {products.length}</div>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-10 text-slate-500 bg-white rounded-xl border border-dashed border-slate-300">
                    No products found in the database.
                </div>
            ) : (
                <>
                    {/* --- Mobile View (Cards) --- */}
                    <div className="md:hidden grid grid-cols-1 gap-4">
                        {products.map((item) => (
                            <div key={item._id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                                <div className="flex gap-4 items-start">
                                    <div className="avatar">
                                        <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-100">
                                            <img src={item.image || "https://via.placeholder.com/50"} alt={item.name} className="object-cover" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-slate-900 truncate">{item.name}</h3>
                                        <p className="text-xs text-slate-500 mb-1">Category: <span className="font-medium text-slate-700">{item.category}</span></p>
                                        <p className="text-blue-600 font-bold">${item.price}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-2 pt-3 border-t border-slate-100">
                                    <Link to={`/dashboard/update-product/${item._id}`} className="btn btn-sm btn-outline text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 w-full">
                                        <FaEdit /> Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-sm btn-outline text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 w-full"
                                    >
                                        <FaTrashAlt /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- Desktop View (Table) --- */}
                    <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-bold">
                                    <tr>
                                        <th className="py-4 pl-6">#</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th className="text-center pr-6">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-slate-100">
                                    {products.map((item, index) => (
                                        <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                                            <th className="pl-6 text-slate-400 font-normal">{index + 1}</th>
                                            <td>
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12 bg-slate-50 border border-slate-100">
                                                        <img src={item.image || "https://via.placeholder.com/50"} alt={item.name} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="font-semibold text-slate-800 max-w-[200px] truncate" title={item.name}>
                                                {item.name}
                                            </td>
                                            <td>
                                                <span className="badge badge-ghost badge-sm font-medium text-slate-500">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="font-bold text-slate-600">
                                                ${item.price}
                                            </td>
                                            <td className="pr-6">
                                                <div className="flex justify-center gap-2">
                                                    <Link to={`/dashboard/update-product/${item._id}`}>
                                                        <button className="btn btn-sm btn-square btn-ghost text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                                                            <FaEdit className="text-lg" />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="btn btn-sm btn-square btn-ghost text-red-500 hover:bg-red-50 transition-colors"
                                                        title="Delete"
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
                    </div>
                </>
            )}
        </div>
    );
};

export default AllProductsAdmin;
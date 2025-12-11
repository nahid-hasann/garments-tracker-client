import axios from "axios";
import { useEffect } from "react";
import useAuth from "../Hook /useAuth"; // আপনার ফোল্ডার পাথ অনুযায়ী
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'https://garments-tracker-server.vercel.app',
    withCredentials: true // ⭐ এটাই মেইন, এর কারণে কুকি অটো সার্ভারে যাবে
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, async error => {
            console.log('error tracked in the interceptor', error.response);

            // যদি সার্ভার 401 (Unauthorized) বা 403 (Forbidden) দেয়
            if (error.response?.status === 401 || error.response?.status === 403) {
                console.log('Logging out user...');
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        })
    }, [logOut, navigate])

    return axiosSecure;
};

export default useAxiosSecure;
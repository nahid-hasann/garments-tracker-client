import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
    const { user } = useAuth();

    useEffect(() => {
        // Request interceptor
        const reqInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("access-token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor
        const resInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error("AXIOS SECURE ERROR:", error);
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user]);

    return axiosSecure;
};

export default useAxiosSecure;

import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { auth } from "../firebase.init";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
    const { user } = useAuth();

    useEffect(() => {
        // REQUEST INTERCEPTOR
        const reqInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                if (auth.currentUser) {
                    // Live Firebase token (auto refresh supported)
                    const token = await auth.currentUser.getIdToken();

                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // RESPONSE INTERCEPTOR
        const resInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                console.log("AXIOS SECURE ERROR:", error);
                return Promise.reject(error);
            }
        );

        // CLEANUP
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user]);

    return axiosSecure;
};

export default useAxiosSecure;

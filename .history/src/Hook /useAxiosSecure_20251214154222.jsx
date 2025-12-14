import axios from "axios";
import { useEffect } from "react";
import useAuth from "../Hook /useAuth";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL: 'https://garments-tracker-server.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, async error => {
           
            console.log('Interceptor Error:', error);

            // ✅ ফিক্স ২: আগে চেক করুন error.response আছে কিনা
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                console.log('Logging out user due to auth error...');
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        })
    }, [logOut, navigate])

    return axiosSecure;
};

export default useAxiosSecure;
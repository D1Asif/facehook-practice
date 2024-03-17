import { useEffect } from "react"
import { api } from "../api";
import { useAuth } from "./useAuth";
import axios from "axios";

export const useAxios = () => {
    const {auth, setAuth} = useAuth();
    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                if (auth.authToken) {
                    config.headers.Authorization = `Bearer ${auth.authToken}`
                }
                return config;
            },
            (error) => {
                console.log(error);
                return Promise.reject(error);
            }
        );

        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (auth?.refreshToken && error.response?.status && !originalRequest._retry) {
                    try {
                        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/refresh-token`, {refreshToken: auth?.refreshToken});
                        const token = response.data;
                        setAuth({
                            ...auth,
                            authToken: token.token,
                            refreshToken: token.refreshToken
                        })
                        originalRequest.headers.Authorization = `Bearer ${token.token}`;
                        console.log(`new token:`, response?.data);
                        originalRequest._retry = true;
                        return axios(originalRequest);
                    } catch (err) {
                        return Promise.reject(err);
                    }
                } else {
                    return Promise.reject(error);
                }
            }
        )

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        }
    }, [auth, setAuth]);

    return {api};
}
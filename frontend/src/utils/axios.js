import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    withCredentials: true,
})

api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("access_token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    res => res,
    async(error) => {
        const originalRequest = error.config;
        const isRefreshEndpoint = originalRequest.url.includes("/auth/refresh");

        if(error.response?.status === 401 && !originalRequest._retry && !isRefreshEndpoint){
            originalRequest._retry = true;
            try {
                const {data} = await api.post("/auth/refresh");
                sessionStorage.setItem("access_token", data.access_token);
                originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                return api(originalRequest);
            } 
            catch (refreshError) {
                console.error("Refresh failed. Consider redirecting to login.");
                window.location.href = '/auth';
            }
        }
        return Promise.reject(error);
    }
)

export default api;
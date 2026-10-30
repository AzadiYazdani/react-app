
import axiosInstance from "../api/axiosInstance";

const authService = {
    async login(credentials) {
        const response = await axiosInstance.post("/auth/login", credentials);
        return response.data;
    },
    async register(data) {
        const response = await axiosInstance.post("/auth/register", data);
        return response.data;
    },
    async getCurrentUser() {
        const response = await axiosInstance.get("/users/me");
        return response.data?.data ?? response.data;
    },
    async refreshToken(refreshToken) {
        const response = await axiosInstance.post("/auth/token/refresh", { refreshToken });
        return response.data;
    },
    async logout(refreshToken) {
        return axiosInstance.post("/auth/logout", { refreshToken });
    }
};

export default authService;

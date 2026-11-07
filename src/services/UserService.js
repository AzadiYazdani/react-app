
import axiosInstance from "../api/axiosInstance";

const userService = {
    async getCurrentUser() {
        const response = await axiosInstance.get("/users/me");
        return response.data?.data ?? response.data;
    },

    async editCurrentUser(data) {
        const response = await axiosInstance.put("/users/me", data);
        return response.data?.data ?? response.data;
    },

    async getAllUsers(params = {}) {
        const response = await axiosInstance.get("/users", { params });
        return response.data?.data ?? response.data;
    },

    async getUserById(userId) {
        const response = await axiosInstance.get(`/users/${userId}`);
        return response.data?.data ?? response.data;
    },

    async searchUsers(keyword, params = {}) {
        const response = await axiosInstance.get("/users/search", {
            params: { keyword, ...params }
        });
        return response.data?.data ?? response.data;
    },

    async editUserByAdmin(userId, data) {
        const response = await axiosInstance.put(`/users/${userId}`, data);
        return response.data?.data ?? response.data;
    },

    async updateUserAccess(userId, data) {
        const response = await axiosInstance.patch(`/users/${userId}/access`, data);
        return response.data?.data ?? response.data;
    }
};

export default userService;

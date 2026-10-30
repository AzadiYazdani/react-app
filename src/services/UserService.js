import axiosInstance from "../api/axiosInstance";

const userService = {
    async getCurrentUser() {
        const response = await axiosInstance.get("/users/me");
        return response.data?.data ?? response.data;
    },

    async editCurrentUser(data) {
        const response = await axiosInstance.put("/users/me", data);
        return response.data?.data ?? response.data;
    }
};

export default userService;

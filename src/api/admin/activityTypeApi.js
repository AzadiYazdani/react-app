
import axiosInstance from "../axios";

export const getActivityTypes = async () => {
    const response = await axiosInstance.get("/activity-type/all");
    return response.data.data;
};

export const addActivityType = async (name, description = '') => {
    const response = await axiosInstance.post("/activity-type/add", {
        name,
        description
    });
    return response.data.data;
};

export const deleteActivityType = async (id) => {
    const response = await axiosInstance.delete(`/activity-type/delete/${id}`);
    return response.data.data;
};

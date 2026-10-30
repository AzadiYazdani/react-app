// src/api/admin/activityTypeApi.js
import axiosInstance from "../axios";

export const getActivityTypes = async () => {
    const response = await axiosInstance.get("/activitytype");
    return response.data.data;
};

export const getActivityTypesByPaging = async (params = {}) => {
    const response = await axiosInstance.get("/activitytype/paging", { params });
    return response.data.data;
};

export const getActivityTypeById = async (id) => {
    const response = await axiosInstance.get(`/activitytype/${id}`);
    return response.data.data;
};

export const searchActivityTypes = async (title) => {
    const response = await axiosInstance.get("/activitytype/search", { params: { title } });
    return response.data.data;
};

export const addActivityType = async (name, title) => {
    const response = await axiosInstance.post("/activitytype", { name, title });
    return response.data.data;
};

export const updateActivityType = async (id, name, title) => {
    const response = await axiosInstance.put(`/activitytype/${id}`, { name, title });
    return response.data.data;
};

export const deleteActivityType = async (id) => {
    const response = await axiosInstance.delete(`/activitytype/${id}`);
    return response.data.data;
};

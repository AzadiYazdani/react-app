
import axiosInstance from "../axios";

export const getBusinessUnions = async () => {
    const response = await axiosInstance.get("/business-union/all");
    return response.data.data;
};

export const addBusinessUnion = async (name) => {
    const response = await axiosInstance.post("/business-union/add", { name });
    return response.data.data;
};

export const deleteBusinessUnion = async (id) => {
    const response = await axiosInstance.delete(`/business-union/delete/${id}`);
    return response.data.data;
};

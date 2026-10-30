
import axiosInstance from "../axios";

export const getBusinessUnions = async () => {
    const response = await axiosInstance.get("/businessunion");
    return response.data.data;
};

export const getBusinessUnionsByPaging = async (params = {}) => {
    const response = await axiosInstance.get("/businessunion/paging", { params });
    return response.data.data;
};

export const getBusinessUnionById = async (id) => {
    const response = await axiosInstance.get(`/businessunion/${id}`);
    return response.data.data;
};

export const getBusinessUnionsByCityId = async (cityId) => {
    const response = await axiosInstance.get(`/businessunion/city/${cityId}`);
    return response.data.data;
};

export const getBusinessUnionsByCityIdPaging = async (cityId, params = {}) => {
    const response = await axiosInstance.get(`/businessunion/city/${cityId}/paging`, { params });
    return response.data.data;
};

export const searchBusinessUnions = async (title) => {
    const response = await axiosInstance.get("/businessunion/search", { params: { title } });
    return response.data.data;
};

export const addBusinessUnion = async (cityId, title, description = "") => {
    const response = await axiosInstance.post("/businessunion/add", {
        cityId,
        title,
        description
    });
    return response.data.data;
};

export const updateBusinessUnion = async (id, cityId, title, description = "") => {
    const response = await axiosInstance.put(`/businessunion/update/${id}`, {
        cityId,
        title,
        description
    });
    return response.data.data;
};

export const deleteBusinessUnion = async (id) => {
    const response = await axiosInstance.delete(`/businessunion/delete/${id}`);
    return response.data.data;
};

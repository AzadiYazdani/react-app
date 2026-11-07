
import axiosInstance from "../axios";

export const getBusinessCategories = async () => {
    const response = await axiosInstance.get("/businesscategory");
    return response.data.data;
};

export const getBusinessCategoriesByPaging = async (params = {}) => {
    const response = await axiosInstance.get("/businesscategory/paging", { params });
    return response.data.data;
};

export const getBusinessCategoryById = async (id) => {
    const response = await axiosInstance.get(`/businesscategory/${id}`);
    return response.data.data;
};

export const getBusinessCategoriesByUnionId = async (businessUnionId) => {
    const response = await axiosInstance.get(
        `/businesscategory/union/${businessUnionId}`
    );

    return response.data.data;
};

export const searchBusinessCategories = async (title) => {
    const response = await axiosInstance.get("/businesscategory/search", { params: { title } });
    return response.data.data;
};

export const addBusinessCategory = async (businessUnionId, title) => {
    const response = await axiosInstance.post("/businesscategory/add", {
        businessUnionId,
        title
    });
    return response.data.data;
};

export const updateBusinessCategory = async (id, businessUnionId, title) => {
    const response = await axiosInstance.put(`/businesscategory/update/${id}`, {
        businessUnionId,
        title
    });
    return response.data.data;
};

export const deleteBusinessCategory = async (id) => {
    const response = await axiosInstance.delete(`/businesscategory/delete/${id}`);
    return response.data.data;
};

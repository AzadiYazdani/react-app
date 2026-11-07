import axiosInstance from "../axios";

export const getBusinessUnionsByPaging = async (params = {}) => {
    const response = await axiosInstance.get(
        "/businessunion/paging",
        { params }
    );
    return response.data.data;
};

// دریافت تمام اتحادیه‌ها برای استفاده در کمبوها
export const getBusinessUnions = async () => {
    const response = await axiosInstance.get("/businessunion");
    return response.data.data;
};

export const getBusinessUnionById = async (id) => {
    const response = await axiosInstance.get(`/businessunion/${id}`);
    return response.data.data;
};

export const searchBusinessUnions = async (title) => {
    const response = await axiosInstance.get("/businessunion/search", {
        params: { title }
    });
    return response.data.data;
};

export const addBusinessUnion = async (data) => {
    const response = await axiosInstance.post("/businessunion/add", data);
    return response.data.data;
};

export const updateBusinessUnion = async (id, data) => {
    const response = await axiosInstance.put(
        `/businessunion/update/${id}`,
        data
    );
    return response.data.data;
};

export const deleteBusinessUnion = async (id) => {
    const response = await axiosInstance.delete(`/businessunion/delete/${id}`);
    return response.data.data;
};

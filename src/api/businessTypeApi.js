import axiosInstance from "./axios";

export const getBusinessTypes = async () => {
    const response = await axiosInstance.get("/businesstype/all");
    return response.data.data;
};

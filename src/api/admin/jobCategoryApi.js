
import axiosInstance from "../axios";

export const getJobCategories = async () => {
    const response = await axiosInstance.get("/job-category/all");
    return response.data.data;
};

export const addJobCategory = async (businessUnionId, name) => {
    const response = await axiosInstance.post("/job-category/add", {
        business_union_id: businessUnionId,
        name
    });
    return response.data.data;
};

export const deleteJobCategory = async (id) => {
    const response = await axiosInstance.delete(`/job-category/delete/${id}`);
    return response.data.data;
};

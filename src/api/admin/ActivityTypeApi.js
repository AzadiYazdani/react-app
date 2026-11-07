import axiosInstance from "../axios";

// دریافت انواع فعالیت به صورت صفحه‌بندی‌شده
export const getActivityTypesByPaging = async (params = {}) => {
    const response = await axiosInstance.get("/activitytype/paging", { params });
    return response.data.data;
};

// دریافت یک نوع فعالیت
export const getActivityTypeById = async (id) => {
    const response = await axiosInstance.get(`/activitytype/${id}`);
    return response.data.data;
};

// جست‌وجو بر اساس عنوان
export const searchActivityTypes = async (title) => {
    const response = await axiosInstance.get("/activitytype/search", {
        params: { title }
    });

    return response.data.data;
};

// افزودن نوع فعالیت
export const addActivityType = async (request) => {
    const response = await axiosInstance.post("/activitytype", request);
    return response.data.data;
};

// ویرایش نوع فعالیت
export const updateActivityType = async (id, request) => {
    const response = await axiosInstance.put(`/activitytype/${id}`, request);
    return response.data.data;
};

// حذف نوع فعالیت
export const deleteActivityType = async (id) => {
    const response = await axiosInstance.delete(`/activitytype/${id}`);
    return response.data.data;
};

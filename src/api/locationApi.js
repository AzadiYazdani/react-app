import axiosInstance from "./axios";

export const getStates = async () => {
    const response = await axiosInstance.get("/location/provinces/all");
    return response.data.data;
};

export const getCities = async (provinceId) => {
    const response = await axiosInstance.get(
        `/location/provinces/${provinceId}/cities`
    );

    return response.data.data;
};

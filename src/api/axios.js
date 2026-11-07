
import axios from "axios";
import config from "../config/config";

const axiosInstance = axios.create({
    baseURL: config.API_BASE_URL,
    timeout: config.REQUEST_TIMEOUT,
    headers: {
        "Content-Type": "application/json"
    }
});

// اضافه کردن خودکار Access Token به تمام درخواست‌ها
axiosInstance.interceptors.request.use(
    (requestConfig) => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            requestConfig.headers = requestConfig.headers || {};
            requestConfig.headers.Authorization = `Bearer ${accessToken}`;
        }

        return requestConfig;
    },
    (error) => Promise.reject(error)
);

// یکسان‌سازی پیام خطا در تمام صفحات پروژه
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const responseData = error?.response?.data;

        if (responseData?.localizedMessage) {
            responseData.message = responseData.localizedMessage;
            error.message = responseData.localizedMessage;
        } else if (!error.response) {
            error.message = "ارتباط با سرور برقرار نشد. لطفاً اتصال خود را بررسی کنید.";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

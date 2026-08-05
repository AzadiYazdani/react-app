import axios from "axios";
import config from "../config/config";

const axiosInstance = axios.create({
    baseURL: config.API_BASE_URL,
    timeout: config.REQUEST_TIMEOUT,
    headers: {
        "Content-Type": "application/json"
    }
});

export default axiosInstance;

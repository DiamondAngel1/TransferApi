import axios from "axios";
import APP_ENV from "../env";

const api = axios.create({
    baseURL: APP_ENV.API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

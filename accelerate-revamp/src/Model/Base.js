import axios from "axios";
import { baseURL } from "./BaseUri";

export const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_JWT_SECRET}`
    }
})
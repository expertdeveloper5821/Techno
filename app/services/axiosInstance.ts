import axios from "axios";

const axiosInstance = axios.create({
  baseURL: typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000" : "",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default axiosInstance;

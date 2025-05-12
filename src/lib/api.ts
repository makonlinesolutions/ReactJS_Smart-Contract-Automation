import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
});

export const startAutomation = async (payload: any) => {
  const response = await API.post("/api/start", payload);
  return response.data;
};

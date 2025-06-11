// Axios instance with config

import axios from "axios";
import { API_BASE_URL } from "@/constants/config";

// Create a pre-configured Axios instance for reuse throughout the app
const api = axios.create({
  baseURL: API_BASE_URL, // Base URL for all API requests
  timeout: 2000, // Requests taking longer than this will fail
  headers: { "Content-Type": "application/json" }, // Optional (Axios sends JSON by default) — explicit for clarity
});

export default api;

// Axios instance with config

import axios from "axios";
import { API_BASE_URL, TMDB_BASE_URL } from "@/constants/config";

// Base Axios instance with default settings for reuse throughout the app
const api = axios.create({
  baseURL: API_BASE_URL, // Base URL for all API requests
  timeout: 2000, // Requests taking longer than this will fail
  headers: { "Content-Type": "application/json" }, // Optional (Axios sends JSON by default) — explicit for clarity
});

// Axios instance for authenticated requests (with interceptors)
export const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  timeout: 2000,
  headers: { "Content-Type": "application/json" },
});

// Axios instance for TMDb requests (e.g. search, media details)
export const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 2000,
  headers: { "Content-Type": "application/json" },
});

export default api;

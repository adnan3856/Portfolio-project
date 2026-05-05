import axios from "axios";

// Backend runs on 8082 according to the README
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8082/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Global response interceptor for unified error logging
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Pass the custom error message from your Spring Boot GlobalExceptionHandler
    const message = error.response?.data?.message || error.message || "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;

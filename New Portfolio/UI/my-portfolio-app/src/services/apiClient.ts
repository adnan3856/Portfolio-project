import axios from "axios";

// Uses Vite proxy setup in vite.config.ts to avoid CORS issues
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Global response interceptor for unified error logging
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the full error to the console for better debugging
    console.error("API Error Details:", error.response || error);

    // Check if Vite failed to proxy the request (meaning Spring Boot is down or on the wrong port)
    if (error.response?.data && typeof error.response.data === 'string' && error.response.data.includes('proxy')) {
      return Promise.reject(new Error("Cannot reach Spring Boot backend. Please ensure it is running on port 8082."));
    }

    // Pass the custom error message from your Spring Boot GlobalExceptionHandler
    const message = error.response?.data?.message || error.response?.data?.error || error.message || "An unexpected error occurred";
    
    return Promise.reject(new Error(message));
  }
);

export default apiClient;

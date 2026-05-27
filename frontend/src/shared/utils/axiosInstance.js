import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

// Error handler function
const handleError = (error) => {
  // Check if it's an Axios error with response
  if (error.response) {
    // Server responded with error status
    const { data, status } = error.response;
    const message = data?.message || "An error occurred";

    const errorObj = {
      status,
      message,
      type: "response",
    };

    // Handle specific status codes
    switch (status) {
      case 400:
        errorObj.type = "BadRequest";
        break;
      case 401:
        errorObj.type = "Unauthorized";
        break;
      case 403:
        errorObj.type = "Forbidden";
        break;
      case 404:
        errorObj.type = "NotFound";
        break;
      case 409:
        errorObj.type = "Conflict";
        break;
      case 422:
        errorObj.type = "ValidationError";
        break;
      case 500:
        errorObj.type = "ServerError";
        break;
      default:
        errorObj.type = "Error";
    }

    return Promise.reject(errorObj);
  }

  // Request was made but no response received
  if (error.request) {
    return Promise.reject({
      message: "No response from server",
      type: "NoResponse",
      error,
    });
  }

  // Error in request setup
  return Promise.reject({
    message: error.message || "Request setup failed",
    type: "RequestError",
    error,
  });
};

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleError(error)
);

export default axiosInstance;

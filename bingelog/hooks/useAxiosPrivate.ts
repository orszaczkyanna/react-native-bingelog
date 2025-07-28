// Hook for setting up Axios interceptors for access token handling
// Attaches access token to requests and refreshes it on 401 Unauthorized responses

import { useEffect } from "react";
import { axiosPrivate } from "@/lib/axios";
import { useAuthContext } from "@/context/AuthContext";
import { refreshAccessToken } from "@/features/auth/refreshAccessToken";

const useAxiosPrivate = () => {
  const { userId, accessToken, setSessionAuth, clearSessionAuth } =
    useAuthContext();

  useEffect(() => {
    // REQUEST interceptor: attach access token to every request (in the Authorization header)
    const requestIntercept = axiosPrivate.interceptors.request.use(
      // Note: The config object contains all request details (method, headers, URL, etc.)
      (config) => {
        if (accessToken && config.headers && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`; // Attach token
          console.log("Access token in request interceptor:", accessToken);
        }
        return config; // Continue with the updated request config
      },

      // If an error occurs while setting up the request, reject the promise with the error
      (error) => Promise.reject(error)
    );

    // RESPONSE interceptor: refresh access token and retry request on 401 Unauthorized
    const responseIntercept = axiosPrivate.interceptors.response.use(
      // If the response is successful, return it as is
      (response) => response,

      // If an error occurs, attempt to refresh the token
      async (error) => {
        const originalRequest = error?.config;

        // Try to refresh on 401 only once to prevent infinite loops
        if (error?.response?.status === 401 && !originalRequest._retried) {
          originalRequest._retried = true; // Mark request as retried with a custom flag

          try {
            const newAccessToken = await refreshAccessToken();

            if (newAccessToken && originalRequest.headers) {
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`; // Update the request with the new token
              setSessionAuth(newAccessToken, "unknown"); // TODO: re-fetch userId

              console.log(
                `Access token (in response interceptor) refreshed: ${newAccessToken}\nUser ID: ${userId}`
              );

              return axiosPrivate(originalRequest); // Retry the original request with the new token
            }
          } catch (refreshError) {
            // If token refresh fails
            clearSessionAuth();
            console.error("Token refresh failed:", refreshError);
            // TODO: Redirect to login
          }
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors when component unmounts
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;

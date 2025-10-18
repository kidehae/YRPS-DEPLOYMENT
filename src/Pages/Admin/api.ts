import axios from "axios";
import type { User, Submission, Stats } from "./types";

const API_BASE_URL = "https://yrs-api-8.onrender.com/api/admin";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Get token from storage - UPDATED TO MATCH YOUR LOGIN
const getToken = (): string | null => {
  return localStorage.getItem("token"); // Changed from 'authToken' to 'token'
};

// Add request interceptor to include auth tokens
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem("token");
      // Dispatch event for auth handling
      window.dispatchEvent(new CustomEvent("auth-required"));
    }
    return Promise.reject(error);
  }
);

export const adminAPI = {
  // Stats
  getStats: async (): Promise<Stats> => {
    const response = await api.get("/stats");
    return response.data;
  },

  // Users
  getUsers: async (): Promise<{ users: User[] }> => {
    const response = await api.get("/users");
    return response.data;
  },

  updateUser: async (
    userId: string,
    updates: Partial<User>
  ): Promise<{ success: boolean }> => {
    const response = await api.put(`/users/${userId}`, updates);
    return response.data;
  },

  // Submissions
  getSubmissions: async (): Promise<{ submissions: Submission[] }> => {
    const response = await api.get("/submissions");
    return response.data;
  },

  updateSubmission: async (
    submissionId: string,
    updates: Partial<Submission>
  ): Promise<{ success: boolean }> => {
    const response = await api.put(`/submissions/${submissionId}`, updates);
    return response.data;
  },
};

// Token management helpers - UPDATED
export const setAuthToken = (token: string) => {
  localStorage.setItem("token", token); // Changed to match your login
};

export const removeAuthToken = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../utils/constants";

export const superAdminService = {
  // Users
  createUser: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.SUPER_ADMIN.USERS, data);
    return response.data;
  },
  getAllUsers: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.SUPER_ADMIN.USERS);
    return response.data;
  },
  getUserById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.SUPER_ADMIN.USER_BY_ID(id));
    return response.data;
  },
  updateUser: async (id, data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.SUPER_ADMIN.USER_BY_ID(id), data);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.SUPER_ADMIN.USER_BY_ID(id));
    return response.data;
  },
  updateUserStatus: async (id, isActive) => {
    const response = await axiosInstance.patch(API_ENDPOINTS.SUPER_ADMIN.USER_STATUS(id), { isActive });
    return response.data;
  },

  // Roles
  createRole: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.SUPER_ADMIN.ROLES, data);
    return response.data;
  },
  getAllRoles: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.SUPER_ADMIN.ROLES);
    return response.data;
  },

  // System
  getDashboard: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.SUPER_ADMIN.DASHBOARD);
    return response.data;
  },
  getSystemHealth: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.SUPER_ADMIN.HEALTH);
    return response.data;
  },
};
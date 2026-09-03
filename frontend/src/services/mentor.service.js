import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../utils/constants";

export const mentorService = {
  // Students
  getMyStudents: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.MENTOR.STUDENTS);
    return response.data;
  },

  getStudentById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.MENTOR.STUDENT_BY_ID(id));
    return response.data;
  },

  // Tasks
  createTask: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.MENTOR.TASKS, data);
    return response.data;
  },

  getMyAssignedTasks: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.MENTOR.TASKS);
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.MENTOR.TASK_BY_ID(id));
    return response.data;
  },

  reviewTask: async (id, data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.MENTOR.TASK_REVIEW(id), data);
    return response.data;
  },

  // Leaves
  getLeavesOfMyStudents: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.MENTOR.LEAVES);
    return response.data;
  },

  getLeaveById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.MENTOR.LEAVE_BY_ID(id));
    return response.data;
  },

  reviewLeave: async (id, data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.MENTOR.LEAVE_REVIEW(id), data);
    return response.data;
  },

  // Evaluations
  createEvaluation: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.MENTOR.EVALUATIONS, data);
    return response.data;
  },

  getMyEvaluations: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.MENTOR.EVALUATIONS);
    return response.data;
  },

  getEvaluationById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.MENTOR.EVALUATION_BY_ID(id));
    return response.data;
  },

  // Certificates
  issueCertificate: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.MENTOR.CERTIFICATES, data);
    return response.data;
  },

  getMyCertificates: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.MENTOR.CERTIFICATES);
    return response.data;
  },
};
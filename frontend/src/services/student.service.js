import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../utils/constants";

export const studentService = {
  // Profile
  getProfile: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.STUDENT.PROFILE);
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.STUDENT.PROFILE, data);
    return response.data;
  },

  // Tasks
  getMyTasks: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.STUDENT.TASKS);
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.STUDENT.TASK_BY_ID(id));
    return response.data;
  },

  startTask: async (id) => {
    const response = await axiosInstance.post(API_ENDPOINTS.STUDENT.TASK_START(id));
    return response.data;
  },

  submitTask: async (id, studentSubmission) => {
    const response = await axiosInstance.post(API_ENDPOINTS.STUDENT.TASK_SUBMIT(id), {
      studentSubmission,
    });
    return response.data;
  },

  // Leave
  applyLeave: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.STUDENT.LEAVE, data);
    return response.data;
  },

  getMyLeaves: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.STUDENT.LEAVE);
    return response.data;
  },

  getLeaveById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.STUDENT.LEAVE_BY_ID(id));
    return response.data;
  },

  cancelLeave: async (id) => {
    const response = await axiosInstance.put(API_ENDPOINTS.STUDENT.LEAVE_CANCEL(id));
    return response.data;
  },

  // Attendance
  checkIn: async (latitude, longitude) => {
    const response = await axiosInstance.post(API_ENDPOINTS.STUDENT.ATTENDANCE_CHECKIN, {
      latitude,
      longitude,
    });
    return response.data;
  },

  checkOut: async (latitude, longitude) => {
    const response = await axiosInstance.put(API_ENDPOINTS.STUDENT.ATTENDANCE_CHECKOUT, {
      latitude,
      longitude,
    });
    return response.data;
  },

  getAttendance: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.STUDENT.ATTENDANCE);
    return response.data;
  },

  // // Evaluations
  // getMyEvaluations: async () => {
  //   const response = await axiosInstance.get(API_ENDPOINTS.STUDENT.EVALUATIONS);
  //   return response.data;
  // },

  // getLatestEvaluation: async () => {
  //   const response = await axiosInstance.get(API_ENDPOINTS.STUDENT.EVALUATION_LATEST);
  //   return response.data;
  // },

  // Certificates
  getMyCertificates: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.STUDENT.CERTIFICATES
    );
    return response.data;
  },

  downloadMyCertificate: async (certificateId) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.STUDENT.CERTIFICATE_DOWNLOAD(
        certificateId
      ),
      {
        responseType: "blob",
      }
    );

    return response;
  },
};
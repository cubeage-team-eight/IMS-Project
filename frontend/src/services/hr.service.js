import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../utils/constants";

export const hrService = {
  // Colleges
  createCollege: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.HR.COLLEGES, data);
    return response.data;
  },
  getAllColleges: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.HR.COLLEGES);
    return response.data;
  },
  getCollegeById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.HR.COLLEGE_BY_ID(id));
    return response.data;
  },
  updateCollege: async (id, data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.HR.COLLEGE_BY_ID(id), data);
    return response.data;
  },
  deleteCollege: async (id) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.HR.COLLEGE_BY_ID(id));
    return response.data;
  },

  // Batches
  createBatch: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.HR.BATCHES, data);
    return response.data;
  },
  getAllBatches: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.HR.BATCHES);
    return response.data;
  },
  getBatchById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.HR.BATCH_BY_ID(id));
    return response.data;
  },
  updateBatch: async (id, data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.HR.BATCH_BY_ID(id), data);
    return response.data;
  },
  deleteBatch: async (id) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.HR.BATCH_BY_ID(id));
    return response.data;
  },
  assignStudentToBatch: async (batchId, studentId) => {
    const response = await axiosInstance.post(API_ENDPOINTS.HR.BATCH_ASSIGN_STUDENT, {
      batchId,
      studentId,
    });
    return response.data;
  },

  // Students
  createStudent: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.HR.STUDENTS, data);
    return response.data;
  },
  getAllStudents: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.HR.STUDENTS);
    return response.data;
  },
  getStudentById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.HR.STUDENT_BY_ID(id));
    return response.data;
  },
  updateStudent: async (id, data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.HR.STUDENT_BY_ID(id), data);
    return response.data;
  },
  deleteStudent: async (id) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.HR.STUDENT_BY_ID(id));
    return response.data;
  },

  // Mentors
  createMentor: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.HR.MENTORS, data);
    return response.data;
  },
  getAllMentors: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.HR.MENTORS);
    return response.data;
  },
  getMentorById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.HR.MENTOR_BY_ID(id));
    return response.data;
  },
  updateMentor: async (id, data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.HR.MENTOR_BY_ID(id), data);
    return response.data;
  },

  // Certificates
  getAllCertificates: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.HR.CERTIFICATES);
    return response.data;
  },
  uploadCertificate: async (formData) => {
    const response = await axiosInstance.post(API_ENDPOINTS.HR.CERTIFICATE_UPLOAD, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};
import axiosInstance from "./axiosInstance";

export const qrAttendanceService = {
  // Mentor: batches assigned to logged-in mentor
  getMentorBatches: async () => {
    const response = await axiosInstance.get(
      "/attendance/mentor/batches"
    );
    return response.data;
  },

  // Mentor: create QR attendance session
  createSession: async (data) => {
    const response = await axiosInstance.post(
      "/attendance/mentor/sessions",
      data
    );
    return response.data;
  },

 getMentorSessions: async () => {
  const response = await axiosInstance.get(
    "/attendance/mentor/sessions"
  );
  return response.data;
},

  // Mentor: close QR session
  closeSession: async (sessionId) => {
    const response = await axiosInstance.put(
      `/attendance/mentor/sessions/${encodeURIComponent(sessionId)}/close`
    );
    return response.data;
  },

  // Student: get active QR sessions for assigned batches
  getStudentSessions: async () => {
    const response = await axiosInstance.get(
      "/attendance/student/sessions"
    );
    return response.data;
  },

  // Student: validate QR session
  validateStudentSession: async (token) => {
    const response = await axiosInstance.post(
      "/attendance/student/validate",
      { token }
    );
    return response.data;
  },

  // Student: submit attendance with captured photo
   // Student: submit attendance with captured photo
  submitStudentAttendance: async (token, photoBlob) => {
    const formData = new FormData();

    formData.append("token", token);
    formData.append("photo", photoBlob, "attendance-photo.jpg");

    const response = await axiosInstance.post(
      "/attendance/student/mark",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },
};


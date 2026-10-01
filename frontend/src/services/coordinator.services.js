// import axiosInstance from "./axiosInstance";
// import { API_ENDPOINTS } from "../utils/constants";

// const getMyCollegeStudents = async () => {
//   const response = await axiosInstance.get(
//     API_ENDPOINTS.COORDINATOR.STUDENTS
//   );
//   return response.data;
// };

// const getStudentById = async (id) => {
//   const response = await axiosInstance.get(
//     API_ENDPOINTS.COORDINATOR.STUDENT_BY_ID(id)
//   );
//   return response.data;
// };

// const coordinatorStudentService = {
//   getMyCollegeStudents,
//   getStudentById,
// };

// const getCollegeAttendance = async (params = {}) => {
//   const response = await axiosInstance.get(
//     API_ENDPOINTS.COORDINATOR.ATTENDANCE,
//     { params }
//   );
//   return response.data;
// };

// export default coordinatorStudentService;


import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../utils/constants";

const getMyCollegeStudents = async (params = {}) => {
  const response = await axiosInstance.get(
    API_ENDPOINTS.COORDINATOR.STUDENTS,
    { params }
  );
  return response.data;
};

const getStudentById = async (id) => {
  const response = await axiosInstance.get(
    API_ENDPOINTS.COORDINATOR.STUDENT_BY_ID(id)
  );
  return response.data;
};

const getCollegeAttendance = async (params = {}) => {
  const response = await axiosInstance.get(
    API_ENDPOINTS.COORDINATOR.ATTENDANCE,
    { params }
  );
  return response.data;
};

const coordinatorStudentService = {
  getMyCollegeStudents,
  getStudentById,
  getCollegeAttendance,
};
const bulkUploadStudents = async (file) => {
  const formData = new FormData();
  formData.append("studentFile", file);

  const response = await axiosInstance.post(
    API_ENDPOINTS.COORDINATOR.STUDENTS_BULK_UPLOAD,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

export default coordinatorStudentService;
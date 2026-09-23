import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../utils/constants";

const getMyCollegeStudents = async () => {
  const response = await axiosInstance.get(
    API_ENDPOINTS.COORDINATOR.STUDENTS
  );
  return response.data;
};

const getStudentById = async (id) => {
  const response = await axiosInstance.get(
    API_ENDPOINTS.COORDINATOR.STUDENT_BY_ID(id)
  );
  return response.data;
};

const coordinatorStudentService = {
  getMyCollegeStudents,
  getStudentById,
};

export default coordinatorStudentService;
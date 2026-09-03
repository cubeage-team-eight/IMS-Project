  import {
  createMentor as createMentorService,
  getAllMentors as getAllMentorsService,
  getMentorById as getMentorByIdService,
updateMentor as updateMentorService,
} from "../../services/hr/mentor.service.js";

export const createMentor = async (req, res) => {
  try {
    const mentor = await createMentorService(req.body);

    return res.status(201).json({
      success: true,
      message: "Mentor created successfully",
      data: mentor,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllMentors = async (req, res) => {
  try {
    const mentors = await getAllMentorsService();

    return res.status(200).json({
      success: true,
      count: mentors.length,
      data: mentors,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMentorById = async (req, res) => {
  try {
    const mentor = await getMentorByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      data: mentor,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateMentor = async (req, res) => {
  try {
    const mentor = await updateMentorService(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Mentor updated successfully",
      data: mentor,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
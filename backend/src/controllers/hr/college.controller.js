import collegeService from "../../services/hr/college.service.js";

// Create College
export const createCollege = async (req, res) => {
  try {
    const college = await collegeService.createCollege(req.body);

    return res.status(201).json({
      success: true,
      message: "College created successfully",
      data: college,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Colleges
export const getAllColleges = async (req, res) => {
  try {
    const colleges = await collegeService.getAllColleges();

    return res.status(200).json({
      success: true,
      message: "Colleges fetched successfully",
      data: colleges,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get College By ID
export const getCollegeById = async (req, res) => {
  try {
    const college = await collegeService.getCollegeById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "College fetched successfully",
      data: college,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update College
export const updateCollege = async (req, res) => {
  try {
    const college = await collegeService.updateCollege(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "College updated successfully",
      data: college,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete College
export const deleteCollege = async (req, res) => {
  try {
    await collegeService.deleteCollege(req.params.id);

    return res.status(200).json({
      success: true,
      message: "College deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
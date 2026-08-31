import internshipService from "../../services/hr/internship.service.js";

// Create Internship
export const createInternship = async (req, res, next) => {
  try {
    const internship = await internshipService.createInternship(req.body);

    return res.status(201).json({
      success: true,
      message: "Internship created successfully",
      data: internship,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Internships
export const getAllInternships = async (req, res, next) => {
  try {
    const internships = await internshipService.getAllInternships();

    return res.status(200).json({
      success: true,
      message: "Internships fetched successfully",
      data: internships,
    });
  } catch (error) {
    next(error);
  }
};

// Get Internship By ID
export const getInternshipById = async (req, res, next) => {
  try {
    const internship = await internshipService.getInternshipById(
      req.params.id
    );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Internship fetched successfully",
      data: internship,
    });
  } catch (error) {
    next(error);
  }
};

// Update Internship
export const updateInternship = async (req, res, next) => {
  try {
    const internship = await internshipService.updateInternship(
      req.params.id,
      req.body
    );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Internship updated successfully",
      data: internship,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Internship
export const deleteInternship = async (req, res, next) => {
  try {
    const internship = await internshipService.deleteInternship(
      req.params.id
    );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Internship deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
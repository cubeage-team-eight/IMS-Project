import coordinatorService from "../../services/superAdmin/coordinator.service.js";

// Create a College Coordinator
export const createCoordinator = async (req, res) => {
  try {
    const coordinator = await coordinatorService.createCoordinator(req.body);

    return res.status(201).json({
      success: true,
      message: "College Coordinator created successfully",
      data: coordinator,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all coordinators
export const getAllCoordinators = async (req, res) => {
  try {
    const coordinators = await coordinatorService.getAllCoordinators();

    return res.status(200).json({
      success: true,
      count: coordinators.length,
      data: coordinators,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get coordinator by ID
export const getCoordinatorById = async (req, res) => {
  try {
    const coordinator = await coordinatorService.getCoordinatorById(req.params.id);

    return res.status(200).json({
      success: true,
      data: coordinator,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update coordinator
export const updateCoordinator = async (req, res) => {
  try {
    const coordinator = await coordinatorService.updateCoordinator(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Coordinator updated successfully",
      data: coordinator,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
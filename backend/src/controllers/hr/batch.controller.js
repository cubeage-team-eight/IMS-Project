import batchService from "../../services/hr/batch.service.js";

// Create Batch
export const createBatch = async (req, res, next) => {
  try {
    const batch = await batchService.createBatch(req.body);

    return res.status(201).json({
      success: true,
      message: "Batch created successfully",
      data: batch,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Batches
export const getAllBatches = async (req, res, next) => {
  try {
    const batches = await batchService.getAllBatches();

    return res.status(200).json({
      success: true,
      message: "Batches fetched successfully",
      data: batches,
    });
  } catch (error) {
    next(error);
  }
};

// Get Batch By ID
export const getBatchById = async (req, res, next) => {
  try {
    const batch = await batchService.getBatchById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Batch fetched successfully",
      data: batch,
    });
  } catch (error) {
    next(error);
  }
};

// Update Batch
export const updateBatch = async (req, res, next) => {
  try {
    const batch = await batchService.updateBatch(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Batch updated successfully",
      data: batch,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Batch
export const deleteBatch = async (req, res, next) => {
  try {
    await batchService.deleteBatch(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Batch deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Assign Student To Batch
export const assignStudent = async (req, res, next) => {
  try {
    const { batchId, studentId } = req.body;

    const result = await batchService.assignStudent(
      batchId,
      studentId
    );

    return res.status(201).json({
      success: true,
      message: "Student assigned to batch successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
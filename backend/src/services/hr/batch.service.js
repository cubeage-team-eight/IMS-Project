import Batch from "../../models/Batch.js";
import BatchStudent from "../../models/BatchStudent.js";

const batchService = {
  // Create batch
  async createBatch(data) {
    return await Batch.create(data);
  },

  // Get all batches
  async getAllBatches() {
    return await Batch.findAll({
      order: [["createdAt", "DESC"]],
    });
  },

  // Get batch by ID
  async getBatchById(id) {
    const batch = await Batch.findByPk(id);

    if (!batch) {
      throw new Error("Batch not found");
    }

    return batch;
  },

  // Update batch
  async updateBatch(id, data) {
    const batch = await Batch.findByPk(id);

    if (!batch) {
      throw new Error("Batch not found");
    }

    await batch.update(data);

    return batch;
  },

  // Delete batch
  async deleteBatch(id) {
    const batch = await Batch.findByPk(id);

    if (!batch) {
      throw new Error("Batch not found");
    }

    await batch.destroy();

    return true;
  },

  // Assign student to batch
  async assignStudent(batchId, studentId) {
    const existing = await BatchStudent.findOne({
      where: {
        batchId,
        studentId,
      },
    });

    if (existing) {
      throw new Error("Student already assigned to this batch");
    }

    return await BatchStudent.create({
      batchId,
      studentId,
    });
  },
};

export default batchService;
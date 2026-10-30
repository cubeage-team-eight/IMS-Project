
import Batch from "../../models/Batch.js";
import BatchStudent from "../../models/BatchStudent.js";
import Mentor from "../../models/mentor/mentor.js";
import Student from "../../models/student/Student.js";

const batchService = {
  // Create batch
  async createBatch(data) {
    return await Batch.create(data);
  },

  // Get all batches with mentor names
  async getAllBatches() {
    return await Batch.findAll({
      include: [
        {
          model: Mentor,
          as: "mentor",
          required: false,
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  },

  // Get batch by ID with assigned students
  async getBatchById(id) {
    const batch = await Batch.findByPk(id, {
      include: [
        {
          model: Mentor,
          as: "mentor",
          required: false,
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: BatchStudent,
          as: "batchStudents",
          required: false,
          include: [
            {
              model: Student,
              as: "student",
              required: false,
            },
          ],
        },
      ],
    });

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
    const batch = await Batch.findByPk(batchId);
    if (!batch) {
      throw new Error("Batch not found");
    }

    const existing = await BatchStudent.findOne({
      where: { batchId, studentId },
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

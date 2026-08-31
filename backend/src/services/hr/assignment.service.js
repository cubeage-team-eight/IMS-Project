import InternshipAssignment from "../../models/InternshipAssignment.js";

const assignmentService = {
  // Create Assignment
  async createAssignment(data) {
    return await InternshipAssignment.create(data);
  },

  // Get All Assignments
  async getAllAssignments() {
    return await InternshipAssignment.findAll({
      order: [["createdAt", "DESC"]],
    });
  },

  // Get Assignment By ID
  async getAssignmentById(id) {
    return await InternshipAssignment.findByPk(id);
  },

  // Update Assignment
  async updateAssignment(id, data) {
    const assignment = await InternshipAssignment.findByPk(id);

    if (!assignment) {
      return null;
    }

    await assignment.update(data);

    return assignment;
  },

  // Delete Assignment
  async deleteAssignment(id) {
    const assignment = await InternshipAssignment.findByPk(id);

    if (!assignment) {
      return null;
    }

    await assignment.destroy();

    return assignment;
  },
};

export default assignmentService;
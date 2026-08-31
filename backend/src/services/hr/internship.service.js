import Internship from "../../models/Internship.js";

const internshipService = {
  // Create Internship
  async createInternship(data) {
    return await Internship.create(data);
  },

  // Get All Internships
  async getAllInternships() {
    return await Internship.findAll({
      order: [["createdAt", "DESC"]],
    });
  },

  // Get Internship By ID
  async getInternshipById(id) {
    return await Internship.findByPk(id);
  },

  // Update Internship
  async updateInternship(id, data) {
    const internship = await Internship.findByPk(id);

    if (!internship) {
      return null;
    }

    await internship.update(data);
    return internship;
  },

  // Delete Internship
  async deleteInternship(id) {
    const internship = await Internship.findByPk(id);

    if (!internship) {
      return null;
    }

    await internship.destroy();
    return internship;
  },
};

export default internshipService;
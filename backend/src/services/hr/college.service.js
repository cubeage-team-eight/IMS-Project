import College from "../../models/College.js";

// Create College
const createCollege = async (data) => {
  const college = await College.create(data);
  return college;
};

// Get All Colleges
const getAllColleges = async () => {
  const colleges = await College.findAll({
    order: [["createdAt", "DESC"]],
  });

  return colleges;
};

// Get College By ID
const getCollegeById = async (id) => {
  const college = await College.findByPk(id);

  if (!college) {
    throw new Error("College not found");
  }

  return college;
};

// Update College
const updateCollege = async (id, data) => {
  const college = await College.findByPk(id);

  if (!college) {
    throw new Error("College not found");
  }

  await college.update(data);

  return college;
};

// Delete College
const deleteCollege = async (id) => {
  const college = await College.findByPk(id);

  if (!college) {
    throw new Error("College not found");
  }

  await college.destroy();

  return true;
};

export default {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
};
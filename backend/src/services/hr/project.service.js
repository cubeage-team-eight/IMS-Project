import { sequelize } from "../../config/database.js";
import Project from "../../models/project/Project.js";
import Student from "../../models/student/Student.js";
import Mentor from "../../models/mentor/Mentor.js"; // use your real filename

export class ServiceError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

const projectInclude = [
  { model: Student, as: "students", through: { attributes: [] } },
  { model: Mentor, as: "mentors", through: { attributes: [] } },
];

const allExist = async (Model, ids) => {
  if (!ids.length) return true;
  const count = await Model.count({ where: { id: ids } });
  return count === new Set(ids).size;
};

const validateIds = async (students, mentors) => {
  if (!(await allExist(Student, students)) || !(await allExist(Mentor, mentors))) {
    throw new ServiceError("Invalid student or mentor id", 400);
  }
};

const findOrFail = async (id) => {
  const project = await Project.findByPk(id);
  if (!project) throw new ServiceError("Project not found", 404);
  return project;
};

export const createProject = async ({ students = [], mentors = [], ...data }, userId) => {
  await validateIds(students, mentors);

  const t = await sequelize.transaction();
  try {
    const project = await Project.create({ ...data, createdBy: userId }, { transaction: t });
    if (students.length) await project.setStudents(students, { transaction: t });
    if (mentors.length) await project.setMentors(mentors, { transaction: t });
    await t.commit();
    return Project.findByPk(project.id, { include: projectInclude });
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export const getAllProjects = () =>
  Project.findAll({ include: projectInclude, order: [["createdAt", "DESC"]] });

export const getProjectById = async (id) => {
  const project = await Project.findByPk(id, { include: projectInclude });
  if (!project) throw new ServiceError("Project not found", 404);
  return project;
};

export const updateProject = async (id, { students, mentors, ...data }) => {
  const project = await findOrFail(id);
  await project.update(data);
  return Project.findByPk(id, { include: projectInclude });
};

export const deleteProject = async (id) => {
  const deleted = await Project.destroy({ where: { id } });
  if (!deleted) throw new ServiceError("Project not found", 404);
};

export const assignToProject = async (projectId, students = [], mentors = []) => {
  const project = await findOrFail(projectId);
  await validateIds(students, mentors);
  if (students.length) await project.addStudents(students);
  if (mentors.length) await project.addMentors(mentors);
  return Project.findByPk(projectId, { include: projectInclude });
};

export const unassignFromProject = async (projectId, students = [], mentors = []) => {
  const project = await findOrFail(projectId);
  if (students.length) await project.removeStudents(students);
  if (mentors.length) await project.removeMentors(mentors);
  return Project.findByPk(projectId, { include: projectInclude });
};
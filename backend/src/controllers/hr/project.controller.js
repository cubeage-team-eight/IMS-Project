// import { sequelize } from "../../config/database.js";
// import Project from "../../models/project/Project.js";   // check the exact filename
// import Student from "../../models/project/ProjectStudent.js"  // check the exact filename
// import Mentor from "../../models/project/ProjectMentor.js";      // check the exact filename

// const projectInclude = [
//   { model: Student, as: "students", through: { attributes: [] } },
//   { model: Mentor, as: "mentors", through: { attributes: [] } },
// ];

// // helper: make sure every id exists
// const allExist = async (Model, ids) => {
//   if (!ids.length) return true;
//   const count = await Model.count({ where: { id: ids } });
//   return count === new Set(ids).size;
// };

// // =========================
// // CREATE PROJECT
// // =========================
// export const createProject = async (req, res) => {
//   const t = await sequelize.transaction();
//   try {
//     const { students = [], mentors = [], ...data } = req.body;

//     if (!(await allExist(Student, students)) || !(await allExist(Mentor, mentors))) {
//       await t.rollback();
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid student or mentor id" });
//     }

//     const project = await Project.create(
//       { ...data, createdBy: req.user.id },
//       { transaction: t }
//     );

//     if (students.length) await project.setStudents(students, { transaction: t });
//     if (mentors.length) await project.setMentors(mentors, { transaction: t });

//     await t.commit();

//     const result = await Project.findByPk(project.id, { include: projectInclude });
//     res.status(201).json({ success: true, data: result });
//   } catch (err) {
//     await t.rollback();
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // =========================
// // GET ALL PROJECTS
// // =========================
// export const getAllProjects = async (req, res) => {
//   try {
//     const projects = await Project.findAll({
//       include: projectInclude,
//       order: [["createdAt", "DESC"]],
//     });
//     res.json({ success: true, data: projects });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // =========================
// // GET PROJECT BY ID
// // =========================
// export const getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findByPk(req.params.id, {
//       include: projectInclude,
//     });
//     if (!project)
//       return res.status(404).json({ success: false, message: "Project not found" });

//     res.json({ success: true, data: project });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // =========================
// // UPDATE PROJECT
// // =========================
// export const updateProject = async (req, res) => {
//   try {
//     const project = await Project.findByPk(req.params.id);
//     if (!project)
//       return res.status(404).json({ success: false, message: "Project not found" });

//     // students/mentors are changed through the assign/unassign endpoints
//     const { students, mentors, ...data } = req.body;
//     await project.update(data);

//     const result = await Project.findByPk(project.id, { include: projectInclude });
//     res.json({ success: true, data: result });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // =========================
// // DELETE PROJECT
// // =========================
// export const deleteProject = async (req, res) => {
//   try {
//     const deleted = await Project.destroy({ where: { id: req.params.id } });
//     if (!deleted)
//       return res.status(404).json({ success: false, message: "Project not found" });

//     res.json({ success: true, message: "Project deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // =========================
// // ASSIGN STUDENTS / MENTORS
// // =========================
// export const assignToProject = async (req, res) => {
//   try {
//     const { projectId, students = [], mentors = [] } = req.body;

//     const project = await Project.findByPk(projectId);
//     if (!project)
//       return res.status(404).json({ success: false, message: "Project not found" });

//     if (!(await allExist(Student, students)) || !(await allExist(Mentor, mentors))) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid student or mentor id" });
//     }

//     // existing links are kept, duplicates are skipped
//     if (students.length) await project.addStudents(students);
//     if (mentors.length) await project.addMentors(mentors);

//     const result = await Project.findByPk(projectId, { include: projectInclude });
//     res.json({ success: true, data: result });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // =========================
// // UNASSIGN STUDENTS / MENTORS
// // =========================
// export const unassignFromProject = async (req, res) => {
//   try {
//     const { projectId, students = [], mentors = [] } = req.body;

//     const project = await Project.findByPk(projectId);
//     if (!project)
//       return res.status(404).json({ success: false, message: "Project not found" });

//     if (students.length) await project.removeStudents(students);
//     if (mentors.length) await project.removeMentors(mentors);

//     const result = await Project.findByPk(projectId, { include: projectInclude });
//     res.json({ success: true, data: result });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };



import * as projectService from "../../services/hr/project.service.js";

const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    console.error("project controller error:", err);
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};

export const createProject = handle(async (req, res) => {
  const data = await projectService.createProject(req.body, req.user.id);
  res.status(201).json({ success: true, data });
});

export const getAllProjects = handle(async (req, res) => {
  res.json({ success: true, data: await projectService.getAllProjects() });
});

export const getProjectById = handle(async (req, res) => {
  res.json({ success: true, data: await projectService.getProjectById(req.params.id) });
});

export const updateProject = handle(async (req, res) => {
  res.json({ success: true, data: await projectService.updateProject(req.params.id, req.body) });
});

export const deleteProject = handle(async (req, res) => {
  await projectService.deleteProject(req.params.id);
  res.json({ success: true, message: "Project deleted" });
});

export const assignToProject = handle(async (req, res) => {
  const { projectId, students, mentors } = req.body;
  res.json({ success: true, data: await projectService.assignToProject(projectId, students, mentors) });
});

export const unassignFromProject = handle(async (req, res) => {
  const { projectId, students, mentors } = req.body;
  res.json({ success: true, data: await projectService.unassignFromProject(projectId, students, mentors) });
});
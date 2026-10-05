import Joi from "joi";

export const createProjectValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  internshipId: Joi.string().uuid().optional(),
  batchId: Joi.string().uuid().optional(),
  students: Joi.array().items(Joi.string().uuid()).default([]),
  mentors: Joi.array().items(Joi.string().uuid()).default([]),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  status: Joi.string().valid("PLANNED", "ACTIVE", "COMPLETED", "ON_HOLD"),
});

export const updateProjectValidation = createProjectValidation.fork(
  ["title"],
  (schema) => schema.optional()
);

export const assignProjectValidation = Joi.object({
  projectId: Joi.string().uuid().required(),
  students: Joi.array().items(Joi.string().uuid()).default([]),
  mentors: Joi.array().items(Joi.string().uuid()).default([]),
}).or("students", "mentors");
import Joi from "joi";

export const createStudentValidation = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required(),

  lastName: Joi.string().trim().max(50).allow("", null),

  email: Joi.string().trim().email().required(),

  password: Joi.string().min(6).max(100).required(),

  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .allow("", null),

  collegeId: Joi.string().uuid().required(),

  enrollmentNumber: Joi.string()
    .trim()
    .max(50)
    .required(),

  course: Joi.string().trim().max(100).allow("", null),

  branch: Joi.string().trim().max(100).allow("", null),

  semester: Joi.string().trim().max(20).allow("", null),

  joiningDate: Joi.date().allow(null),
});

export const updateStudentValidation = Joi.object({
  firstName: Joi.string().trim().min(2).max(50),

  lastName: Joi.string().trim().max(50).allow("", null),

  email: Joi.string().trim().email(),

  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .allow("", null),

  collegeId: Joi.string().uuid(),

  enrollmentNumber: Joi.string()
    .trim()
    .max(50),

  course: Joi.string().trim().max(100),

  branch: Joi.string().trim().max(100),

  semester: Joi.string().trim().max(20),

  joiningDate: Joi.date().allow(null),
}).min(1);
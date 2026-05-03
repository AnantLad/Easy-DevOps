import { body, validationResult } from 'express-validator';
import { errorResponse } from '../utils/responseHandler.js';

export const validateRequest = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((err) => `${err.param}: ${err.msg}`);
      return errorResponse(res, errorMessages.join(', '), 400);
    }
    next();
  };
};

// Common validation schemas
export const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
];

export const signupValidation = [
  body('username').isLength({ min: 3 }).trim(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').optional().trim(),
  body('lastName').optional().trim(),
];

export const taskValidation = [
  body('taskId').notEmpty(),
  body('sessionId').notEmpty(),
];

export default { validateRequest, loginValidation, signupValidation, taskValidation };

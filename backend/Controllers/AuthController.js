import authService from '../services/authService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import logger from '../utils/logger.js';

export const AuthController = {
  async signup(req, res, next) {
    try {
      const { username, email, password, firstName, lastName } = req.body;

      const result = await authService.signup({
        username,
        email,
        password,
        firstName,
        lastName,
      });

      return successResponse(res, 'User signed up successfully', result, 201);
    } catch (error) {
      logger.error(`Signup controller error: ${error.message}`);
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      return successResponse(res, 'Login successful', result);
    } catch (error) {
      logger.error(`Login controller error: ${error.message}`);
      next(error);
    }
  },

  async getProfile(req, res, next) {
    try {
      const user = await authService.getUserById(req.user.id);

      return successResponse(res, 'Profile retrieved', { user });
    } catch (error) {
      logger.error(`Get profile controller error: ${error.message}`);
      next(error);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const { firstName, lastName, bio, level } = req.body;

      const updateData = {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(bio && { 'profile.bio': bio }),
        ...(level && { 'profile.level': level }),
      };

      const user = await authService.updateProfile(req.user.id, updateData);

      return successResponse(res, 'Profile updated successfully', { user });
    } catch (error) {
      logger.error(`Update profile controller error: ${error.message}`);
      next(error);
    }
  },
};

export default AuthController;

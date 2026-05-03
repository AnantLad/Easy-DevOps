import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import logger from '../utils/logger.js';

export const authService = {
  async signup(userData) {
    try {
      const { username, email, password, firstName, lastName } = userData;

      // Check if user already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Create new user
      const user = new User({
        username,
        email,
        password,
        firstName,
        lastName,
      });

      await user.save();

      // Generate tokens
      const accessToken = generateAccessToken(user._id, user.email, user.role);
      const refreshToken = generateRefreshToken(user._id);

      logger.info(`User ${user.email} signed up successfully`);

      return {
        user: user.toJSON(),
        accessToken,
        refreshToken,
      };
    } catch (error) {
      logger.error(`Signup error: ${error.message}`);
      throw error;
    }
  },

  async login(email, password) {
    try {
      const user = await User.findOne({ email }).select('+password');

      if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid email or password');
      }

      user.lastLogin = new Date();
      await user.save();

      const accessToken = generateAccessToken(user._id, user.email, user.role);
      const refreshToken = generateRefreshToken(user._id);

      logger.info(`User ${user.email} logged in successfully`);

      return {
        user: user.toJSON(),
        accessToken,
        refreshToken,
      };
    } catch (error) {
      logger.error(`Login error: ${error.message}`);
      throw error;
    }
  },

  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user.toJSON();
    } catch (error) {
      logger.error(`Get user error: ${error.message}`);
      throw error;
    }
  },

  async updateProfile(userId, updateData) {
    try {
      const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
      if (!user) {
        throw new Error('User not found');
      }
      logger.info(`User ${user.email} profile updated`);
      return user.toJSON();
    } catch (error) {
      logger.error(`Update profile error: ${error.message}`);
      throw error;
    }
  },
};

export default authService;

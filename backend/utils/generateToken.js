import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import logger from './logger.js';

export const generateAccessToken = (userId, email, role) => {
  try {
    const token = jwt.sign(
      { id: userId, email, role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiry }
    );
    return token;
  } catch (error) {
    logger.error(`Error generating access token: ${error.message}`);
    throw error;
  }
};

export const generateRefreshToken = (userId) => {
  try {
    const token = jwt.sign(
      { id: userId },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiry }
    );
    return token;
  } catch (error) {
    logger.error(`Error generating refresh token: ${error.message}`);
    throw error;
  }
};

export const verifyToken = (token, isRefresh = false) => {
  try {
    const secret = isRefresh ? config.jwt.refreshSecret : config.jwt.secret;
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    logger.error(`Error verifying token: ${error.message}`);
    throw error;
  }
};

export default { generateAccessToken, generateRefreshToken, verifyToken };

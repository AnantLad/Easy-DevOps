/**
 * Email validation
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with details
 */
export const validatePassword = (password) => {
  const result = {
    isValid: true,
    errors: [],
  };

  if (!password || password.length < 6) {
    result.errors.push('Password must be at least 6 characters');
    result.isValid = false;
  }

  if (!/[A-Z]/.test(password)) {
    result.errors.push('Password must contain an uppercase letter');
  }

  if (!/[0-9]/.test(password)) {
    result.errors.push('Password must contain a number');
  }

  return result;
};

/**
 * Username validation
 * @param {string} username - Username to validate
 * @returns {boolean} Is valid username
 */
export const isValidUsername = (username) => {
  if (!username || username.length < 3) return false;
  if (username.length > 20) return false;
  // Only alphanumeric and underscore
  return /^[a-zA-Z0-9_]+$/.test(username);
};

/**
 * Required field validation
 * @param {any} value - Value to check
 * @param {string} fieldName - Field name for error message
 * @returns {Object} Validation result
 */
export const isRequired = (value, fieldName = 'Field') => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return {
      isValid: false,
      error: `${fieldName} is required`,
    };
  }
  return { isValid: true };
};

/**
 * Min length validation
 * @param {string} value - Value to check
 * @param {number} minLength - Minimum length
 * @param {string} fieldName - Field name for error message
 * @returns {Object} Validation result
 */
export const minLength = (value, minLength, fieldName = 'Field') => {
  if (!value || value.length < minLength) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${minLength} characters`,
    };
  }
  return { isValid: true };
};

/**
 * Max length validation
 * @param {string} value - Value to check
 * @param {number} maxLength - Maximum length
 * @param {string} fieldName - Field name for error message
 * @returns {Object} Validation result
 */
export const maxLength = (value, maxLength, fieldName = 'Field') => {
  if (value && value.length > maxLength) {
    return {
      isValid: false,
      error: `${fieldName} must not exceed ${maxLength} characters`,
    };
  }
  return { isValid: true };
};

/**
 * URL validation
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid URL
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * File size validation
 * @param {File} file - File to validate
 * @param {number} maxSizeInMB - Maximum size in MB
 * @returns {Object} Validation result
 */
export const validateFileSize = (file, maxSizeInMB = 5) => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    return {
      isValid: false,
      error: `File size must not exceed ${maxSizeInMB}MB`,
    };
  }
  return { isValid: true };
};

/**
 * File type validation
 * @param {File} file - File to validate
 * @param {string[]} allowedTypes - Allowed MIME types
 * @returns {Object} Validation result
 */
export const validateFileType = (file, allowedTypes = []) => {
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }
  return { isValid: true };
};

export default {
  isValidEmail,
  validatePassword,
  isValidUsername,
  isRequired,
  minLength,
  maxLength,
  isValidUrl,
  validateFileSize,
  validateFileType,
};

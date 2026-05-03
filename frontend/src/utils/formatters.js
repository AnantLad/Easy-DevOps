/**
 * Format difficulty level with color
 * @param {string} difficulty - Difficulty level
 * @returns {Object} Color classes for difficulty
 */
export const getDifficultyColor = (difficulty) => {
  const colors = {
    'Beginner': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Advanced': 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return colors[difficulty] || 'bg-slate-800 text-slate-300 border-slate-700';
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format date with time
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date and time
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format score with percentage
 * @param {number} score - Current score
 * @param {number} maxScore - Maximum score
 * @returns {string} Formatted score
 */
export const formatScore = (score, maxScore) => {
  if (!maxScore) return '0 pts';
  const percentage = Math.round((score / maxScore) * 100);
  return `${score}/${maxScore} (${percentage}%)`;
};

/**
 * Format number as percentage
 * @param {number} value - Value to format
 * @param {number} decimals - Decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 0) => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Truncate text to specific length
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 50) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Format time duration (mm:ss or hh:mm:ss)
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration
 */
export const formatDuration = (seconds) => {
  if (!seconds) return '0:00';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${minutes}:${String(secs).padStart(2, '0')}`;
};

/**
 * Capitalize first letter
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Convert camelCase to Title Case
 * @param {string} text - Text to convert
 * @returns {string} Title case text
 */
export const camelCaseToTitleCase = (text) => {
  if (!text) return '';
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
};

export default {
  getDifficultyColor,
  formatDate,
  formatDateTime,
  formatScore,
  formatPercentage,
  truncateText,
  formatDuration,
  capitalize,
  camelCaseToTitleCase,
};

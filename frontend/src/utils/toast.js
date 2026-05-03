import toast from 'react-hot-toast';

/**
 * Success toast notification
 * @param {string} message - Message to display
 * @param {Object} options - Toast options
 */
export const toastSuccess = (message, options = {}) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
    ...options,
  });
};

/**
 * Error toast notification
 * @param {string} message - Message to display
 * @param {Object} options - Toast options
 */
export const toastError = (message, options = {}) => {
  toast.error(message, {
    duration: 3000,
    position: 'top-right',
    ...options,
  });
};

/**
 * Info toast notification
 * @param {string} message - Message to display
 * @param {Object} options - Toast options
 */
export const toastInfo = (message, options = {}) => {
  toast(message, {
    duration: 3000,
    position: 'top-right',
    icon: 'ℹ️',
    ...options,
  });
};

/**
 * Loading toast notification
 * @param {string} message - Message to display
 * @returns {string} Toast ID for later updates
 */
export const toastLoading = (message) => {
  return toast.loading(message, {
    position: 'top-right',
  });
};

/**
 * Promise toast - handles async operations
 * @param {Promise} promise - Promise to handle
 * @param {Object} messages - Messages for different states
 * @param {string} messages.loading - Loading message
 * @param {string} messages.success - Success message
 * @param {string} messages.error - Error message
 */
export const toastPromise = (promise, messages) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading || 'Loading...',
      success: messages.success || 'Success!',
      error: messages.error || 'An error occurred',
    },
    {
      position: 'top-right',
    }
  );
};

/**
 * Dismiss a specific toast by ID
 * @param {string} toastId - Toast ID to dismiss
 */
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

/**
 * Dismiss all toasts
 */
export const dismissAllToasts = () => {
  toast.remove();
};

export default {
  success: toastSuccess,
  error: toastError,
  info: toastInfo,
  loading: toastLoading,
  promise: toastPromise,
  dismiss: dismissToast,
  dismissAll: dismissAllToasts,
};

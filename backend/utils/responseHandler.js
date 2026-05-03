export const responseHandler = (res, statusCode, success, message, data = null) => {
  const response = {
    success,
    message,
    ...(data && { data }),
    timestamp: new Date().toISOString(),
  };

  return res.status(statusCode).json(response);
};

export const successResponse = (res, message, data = null, statusCode = 200) => {
  return responseHandler(res, statusCode, true, message, data);
};

export const errorResponse = (res, message, statusCode = 500, data = null) => {
  return responseHandler(res, statusCode, false, message, data);
};

export const paginatedResponse = (res, message, data, pagination, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination,
    timestamp: new Date().toISOString(),
  });
};

export default { responseHandler, successResponse, errorResponse, paginatedResponse };

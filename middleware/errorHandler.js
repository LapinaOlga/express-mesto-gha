const { HTTP_INTERNAL_ERROR, HTTP_BAD_REQUEST } = require('../enums/httpCodes');

module.exports.errorHandlerMiddleware = async (err, req, res, next) => {
  let status = HTTP_INTERNAL_ERROR;
  let message = err.message || 'Произошла непредвиденная ошибка';

  if (typeof err.statusCode === 'function') {
    status = err.statusCode();
    message = err.message;
  } else if (err.name === 'ValidationError') {
    const firstKey = Object.keys(err.errors)[0];
    status = HTTP_BAD_REQUEST;
    message = err.errors[firstKey].message;
  }

  res.status(status).send({ message });

  next();
  return null;
};

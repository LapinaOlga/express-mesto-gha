const jwt = require('jsonwebtoken');
const User = require('./models/user');
const {
  HTTP_INTERNAL_ERROR, HTTP_NOT_FOUND, HTTP_BAD_REQUEST,
} = require('./enums/httpCodes');
const ProtectedRouteError = require('./errors/ProtectedRouteError');

module.exports.authMiddleware = async (req, res, next) => {
  if (['/signin', '/signup'].includes(req.url)) {
    next();
    return;
  }

  const token = req.cookies.jwt;

  if (!token) {
    next(new ProtectedRouteError());
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    next(new ProtectedRouteError());
    return;
  }

  try {
    // Пользователь может быть удален, а JWT токен при этом будет активным.
    // Дополнительно проверяем этот кейс.
    const user = await User.findById(payload._id);

    if (!user) {
      throw new ProtectedRouteError();
    }

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports.notFoundMiddleware = async (req, res) => {
  res.status(HTTP_NOT_FOUND).send({ message: 'Page not found' });
};

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

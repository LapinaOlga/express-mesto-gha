const TEST_USER_ID = '000000000000000000000000';
const User = require('./models/user');
const { HTTP_INTERNAL_ERROR, HTTP_NOT_FOUND, HTTP_BAD_REQUEST } = require('./enums/httpCodes');

module.exports.authMiddleware = async (req, res, next) => {
  let user;

  try {
    user = await User.findById(TEST_USER_ID);

    if (!user) {
      user = await User.create({
        _id: TEST_USER_ID,
        name: 'Тестовый пользователь',
        about: 'Информация о себе',
        avatar: 'https://pixabay.com/photos/crazy-horse-memorial-native-american-4577682/',
      });
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
  let message = 'Произошла непредвиденная ошибка';

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

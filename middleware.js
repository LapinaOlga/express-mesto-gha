const TEST_USER_ID = '5d8b8592978f8bd833ca8133';
const User = require('./models/user');

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

    req.user = {
      _id: TEST_USER_ID,
    };
    next();
  } catch (e) {
    next(e);
  }
};

module.exports.errorHandlerMiddleware = async (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let status = 500;
  let message = 'Произошла непредвиденная ошибка';

  // Внутренняя ошибка.
  if (typeof err.statusCode === 'function') {
    status = err.statusCode();
    message = err.message;
  }

  res.status(status).send({ message });

  return null;
};

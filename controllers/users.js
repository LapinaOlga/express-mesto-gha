const User = require('../models/user');
const { convertUser } = require('../utils/convertUser');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createUser = async (req, res, next) => {
  try {
    if (!req.body
      || typeof req.body !== 'object'
      || !Object.hasOwnProperty.call(req.body, 'name')
      || !Object.hasOwnProperty.call(req.body, 'about')
      || !Object.hasOwnProperty.call(req.body, 'avatar')
    ) {
      throw new BadRequestError('Данные пользователя переданы неверно');
    }

    const { name, about, avatar } = req.body;

    const user = await User.create({ name, about, avatar });

    res.send({ data: convertUser(user) });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    res.send({ data: convertUser(user) });
  } catch (e) {
    if (e.message.startsWith('Cast to ObjectId failed')) {
      next(new BadRequestError('ID пользователя указан неверно'));
    } else {
      next(e);
    }
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.send({ data: users.map((user) => convertUser(user)) });
  } catch (e) {
    next(e);
  }
};

module.exports.updateCurrentUser = async (req, res, next) => {
  try {
    if (!req.body
      || typeof req.body !== 'object'
      || !Object.hasOwnProperty.call(req.body, 'name')
      || !Object.hasOwnProperty.call(req.body, 'about')
    ) {
      throw new BadRequestError('Данные пользователя переданы неверно');
    }

    const { name, about } = req.body;

    await User.findByIdAndUpdate(req.user._id, { name, about });

    req.user = await User.findById(req.user._id);
    res.send({ data: convertUser(req.user) });
  } catch (e) {
    next(e);
  }
};

module.exports.updateCurrentUserAvatar = async (req, res, next) => {
  try {
    if (!req.body
      || typeof req.body !== 'object'
      || !Object.hasOwnProperty.call(req.body, 'avatar')
    ) {
      throw new BadRequestError('Данные пользователя переданы неверно');
    }

    const { avatar } = req.body;

    await User.findByIdAndUpdate(req.user._id, { avatar });
    req.user = await User.findById(req.user._id);
    res.send({ data: convertUser(req.user) });
  } catch (e) {
    next(e);
  }
};

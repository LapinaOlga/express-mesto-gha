const User = require('../models/user');
const { convertUser } = require('../utils/convertUser');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const { HTTP_CREATED } = require('../enums/httpCodes');

module.exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(HTTP_CREATED).send({ data: convertUser(user) });
  } catch (e) {
    next(e);
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
    if (e.name === 'CastError') {
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
    req.user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name || null,
        about: req.body.about || null,
      },
      { new: true },
    );
    res.send({ data: convertUser(req.user) });
  } catch (e) {
    next(e);
  }
};

module.exports.updateCurrentUserAvatar = async (req, res, next) => {
  try {
    req.user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar || null },
      { new: true },
    );
    res.send({ data: convertUser(req.user) });
  } catch (e) {
    next(e);
  }
};

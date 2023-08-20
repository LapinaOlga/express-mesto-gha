const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/user');
const { convertUser } = require('../utils/convertUser');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const { HTTP_CREATED, HTTP_BAD_REQUEST } = require('../enums/httpCodes');
const UnauthorizedError = require('../errors/UnauthorizedError');
const UserExistsError = require('../errors/UserExistsError');

module.exports.createUser = async (req, res, next) => {
  try {
    let passwordHash = '';

    // Если пароль указан, то хешируем его. Если нет - то mongoose вернет ошибку валидации
    if (req.body && req.body.password) {
      passwordHash = bcrypt.hashSync(req.body.password, 10);
    }

    const user = await User.create({
      ...req.body,
      password: passwordHash,
    });

    res.status(HTTP_CREATED).send({ data: convertUser(user) });
  } catch (e) {
    if (e.name === 'MongoServerError' && e.code === 11000) {
      next(new UserExistsError());
    } else {
      next(e);
    }
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

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    res.send({ data: convertUser(req.user, true) });
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
      { new: true, runValidators: true },
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
      { new: true, runValidators: true },
    );
    res.send({ data: convertUser(req.user) });
  } catch (e) {
    next(e);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== 'string' || !validator.isEmail(email)) {
      res.status(HTTP_BAD_REQUEST).send({ message: 'Поле email должно содержать валидный email' });
      return;
    } if (typeof password !== 'string') {
      res.status(HTTP_BAD_REQUEST).send({ message: 'Поле password обязательно к заполнению' });
      return;
    } if (password.length < 10) {
      res.status(HTTP_BAD_REQUEST).send({ message: 'Поле password не может быть короче 10 символов' });
      return;
    }

    const user = await User.findOne({ email })
      .select('+password');

    if (!user) {
      throw new UnauthorizedError();
    }

    // Проверяем пароль
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedError();
    }

    // Повторяем ответ от сервера Яндекса
    res.send({
      token: jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }),
    });
  } catch (e) {
    next(e);
  }
};

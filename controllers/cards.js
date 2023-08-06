const mongoose = require('mongoose');
const Card = require('../models/card');
const { convertCard } = require('../utils/convertCard');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getAllCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).limit(30).exec();
    const result = await Promise.all(
      cards.map((card) => convertCard(card)),
    );

    res.send({ data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    if (!req.body
      || typeof req.body !== 'object'
      || !Object.hasOwnProperty.call(req.body, 'name')
      || !Object.hasOwnProperty.call(req.body, 'link')
    ) {
      throw new BadRequestError('Данные карточки переданы неверно');
    }

    const { name, link } = req.body;

    const card = await Card.create({ name, link, owner: req.user._id });

    res.send({ data: await convertCard(card) });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCardById = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);

    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }

    res.send({ data: null });
  } catch (error) {
    if (error.message.startsWith('Cast to ObjectId failed')) {
      next(new BadRequestError('ID пользователя указан неверно'));
    } else {
      next(error);
    }
  }
};

module.exports.addLikeToCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }

    // Проверяем, есть ли лайк от текущего пользователя
    const hasLikeFromCurrentUser = card.likes.some((userId) => `${userId}` === `${req.user._id}`);
    if (hasLikeFromCurrentUser) {
      throw new BadRequestError('Вы уже ставили лайк этой карточке');
    }

    await Card.findByIdAndUpdate(
      card._id,
      { $addToSet: { likes: new mongoose.Types.ObjectId(req.user._id) } },
      { new: true },
    );

    const resultCard = await Card.findById(req.params.id);
    res.send({ data: await convertCard(resultCard) });
  } catch (error) {
    if (error.message.startsWith('Cast to ObjectId failed')) {
      next(new BadRequestError('ID пользователя указан неверно'));
    } else {
      next(error);
    }
  }
};

module.exports.deleteLikeFromCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }

    // Проверяем, есть ли лайк от текущего пользователя
    const hasLikeFromCurrentUser = card.likes.some((userId) => `${userId}` === `${req.user._id}`);
    if (!hasLikeFromCurrentUser) {
      throw new BadRequestError('Вы еще не ставили лайк этой карточке');
    }

    await Card.findByIdAndUpdate(
      card._id,
      { $pull: { likes: new mongoose.Types.ObjectId(req.user._id) } },
      { new: true },
    );

    const resultCard = await Card.findById(req.params.id);
    res.send({ data: await convertCard(resultCard) });
  } catch (error) {
    if (error.message.startsWith('Cast to ObjectId failed')) {
      next(new BadRequestError('ID карточки указан неверно'));
    } else {
      next(error);
    }
  }
};

const mongoose = require('mongoose');
const Card = require('../models/card');
const { convertCard } = require('../utils/convertCard');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const { HTTP_CREATED } = require('../enums/httpCodes');

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
    const card = await Card.create({
      ...req.body,
      owner: req.user._id,
    });

    card.owner = req.user;

    res.status(HTTP_CREATED).send({ data: await convertCard(card) });
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
    if (error.name === 'CastError') {
      next(new BadRequestError('ID карточки указан неверно'));
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

    const result = await Card
      .findByIdAndUpdate(
        card._id,
        { $addToSet: { likes: new mongoose.Types.ObjectId(req.user._id) } },
        { new: true },
      )
      .populate('owner')
      .populate('likes')
      .exec();

    res.send({ data: await convertCard(result) });
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('ID карточки указан неверно'));
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

    const result = await Card
      .findByIdAndUpdate(
        card._id,
        { $pull: { likes: new mongoose.Types.ObjectId(req.user._id) } },
        { new: true },
      )
      .populate('owner')
      .populate('likes')
      .exec();

    res.send({ data: await convertCard(result) });
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('ID карточки указан неверно'));
    } else {
      next(error);
    }
  }
};

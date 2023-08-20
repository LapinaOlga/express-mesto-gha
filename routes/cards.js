const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards, createCard, deleteCardById, addLikeToCard, deleteLikeFromCard,
} = require('../controllers/cards');

router.get('', celebrate({
  headers: {
    authorization: Joi.string().required().regex(/^Bearer /i),
  },
}), getAllCards);

router.post('', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
  headers: {
    authorization: Joi.string().required().regex(/^Bearer /i),
  },
}), createCard);

router.delete('/:id', celebrate({
  params: {
    id: Joi.string().required().alphanum().length(24),
  },
  headers: {
    authorization: Joi.string().required().regex(/^Bearer /i),
  },
}), deleteCardById);

router.put('/:id/likes', celebrate({
  params: {
    id: Joi.string().required().alphanum().length(24),
  },
  headers: {
    authorization: Joi.string().required().regex(/^Bearer /i),
  },
}), addLikeToCard);

router.delete('/:id/likes', celebrate({
  params: {
    id: Joi.string().required().alphanum().length(24),
  },
  headers: {
    authorization: Joi.string().required().regex(/^Bearer /i),
  },
}), deleteLikeFromCard);

module.exports = router;

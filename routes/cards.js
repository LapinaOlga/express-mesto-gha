const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards, createCard, deleteCardById, addLikeToCard, deleteLikeFromCard,
} = require('../controllers/cards');

router.get('', getAllCards);

router.post('', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}), createCard);

router.delete('/:id', celebrate({
  params: {
    id: Joi.string().required().alphanum().length(24),
  },
}), deleteCardById);

router.put('/:id/likes', celebrate({
  params: {
    id: Joi.string().required().alphanum().length(24),
  },
}), addLikeToCard);

router.delete('/:id/likes', celebrate({
  params: {
    id: Joi.string().required().alphanum().length(24),
  },
}), deleteLikeFromCard);

module.exports = router;

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards, createCard, deleteCardById, addLikeToCard, deleteLikeFromCard,
} = require('../controllers/cards');
const { validateUrl } = require('../utils/validateUrl');
const authMiddleware = require('../middleware/auth');

router.get('', getAllCards);

router.post('', authMiddleware, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value, helper) => {
      if (validateUrl(value)) {
        return value;
      }
      return helper.message('Поле link содержит невалидный URL');
    }),
  }),
}), createCard);

router.delete('/:id', authMiddleware, celebrate({
  params: {
    id: Joi.string().required().hex().length(24),
  },
}), deleteCardById);

router.put('/:id/likes', authMiddleware, celebrate({
  params: {
    id: Joi.string().required().hex().length(24),
  },
}), addLikeToCard);

router.delete('/:id/likes', authMiddleware, celebrate({
  params: {
    id: Joi.string().required().hex().length(24),
  },
}), deleteLikeFromCard);

module.exports = router;

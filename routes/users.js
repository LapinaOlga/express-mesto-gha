const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById, getAllUsers, updateCurrentUser, updateCurrentUserAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('', celebrate({
  headers: {
    authorization: Joi.string().required().regex(/^Bearer /i),
  },
}), getAllUsers);
router.get('/me', celebrate({
  headers: {
    authorization: Joi.string().required().regex(/^Bearer /i),
  },
}), getCurrentUser);
router.patch('/me', celebrate({
  body: {
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  },
  headers: {
    authorization: Joi.string().required().regex(/^Bearer /i),
  },
}), updateCurrentUser);
router.patch('/me/avatar', celebrate({
  body: {
    avatar: Joi.string().required().uri(),
  },
  headers: {
    authorization: Joi.string().required().regex(/^Bearer /i),
  },
}), updateCurrentUserAvatar);
router.get('/:id', celebrate({
  params: {
    id: Joi.string().required().alphanum().length(24),
  },
  headers: {
    authorization: Joi.string().required().regex(/^Bearer /i),
  },
}), getUserById);

module.exports = router;

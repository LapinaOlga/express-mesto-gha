const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById, getAllUsers, updateCurrentUser, updateCurrentUserAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('', getAllUsers);
router.get('/me', getCurrentUser);
router.patch('/me', celebrate({
  body: {
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  },
}), updateCurrentUser);
router.patch('/me/avatar', celebrate({
  body: {
    avatar: Joi.string().required().uri(),
  },
}), updateCurrentUserAvatar);
router.get('/:id', celebrate({
  params: {
    id: Joi.string().required().alphanum().length(24),
  },
}), getUserById);

module.exports = router;

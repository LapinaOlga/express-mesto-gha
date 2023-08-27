const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById, getAllUsers, updateCurrentUser, updateCurrentUserAvatar, getCurrentUser,
} = require('../controllers/users');
const { validateUrl } = require('../utils/validateUrl');
const authMiddleware = require('../middleware/auth');

router.get('', authMiddleware, getAllUsers);
router.get('/me', authMiddleware, getCurrentUser);
router.patch('/me', authMiddleware, celebrate({
  body: {
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  },
}), updateCurrentUser);
router.patch('/me/avatar', authMiddleware, celebrate({
  body: {
    avatar: Joi.string().required().custom((value, helper) => {
      if (validateUrl(value)) {
        return value;
      }
      return helper.message('Поле avatar содержит невалидный URL');
    }),
  },
}), updateCurrentUserAvatar);
router.get('/:id', authMiddleware, celebrate({
  params: {
    id: Joi.string().required().hex().length(24),
  },
}), getUserById);

module.exports = router;

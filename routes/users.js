const router = require('express').Router();
const {
  getUserById, getAllUsers, updateCurrentUser, updateCurrentUserAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('', getAllUsers);
router.get('/me', getCurrentUser);
router.patch('/me', updateCurrentUser);
router.patch('/me/avatar', updateCurrentUserAvatar);
router.get('/:id', getUserById);

module.exports = router;

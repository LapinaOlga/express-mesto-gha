const router = require('express').Router();
const {
  createUser, getUserById, getAllUsers, updateCurrentUser, updateCurrentUserAvatar,
} = require('../controllers/users');

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.patch('/users/me', updateCurrentUser);
router.patch('/users/me/avatar', updateCurrentUserAvatar);
router.get('/users/:id', getUserById);

module.exports = router;

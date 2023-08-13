const router = require('express').Router();
const {
  createUser, getUserById, getAllUsers, updateCurrentUser, updateCurrentUserAvatar,
} = require('../controllers/users');

router.get('', getAllUsers);
router.post('', createUser);
router.patch('/me', updateCurrentUser);
router.patch('/me/avatar', updateCurrentUserAvatar);
router.get('/:id', getUserById);

module.exports = router;

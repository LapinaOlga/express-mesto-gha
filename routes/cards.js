const router = require('express').Router();
const {
  getAllCards, createCard, deleteCardById, addLikeToCard, deleteLikeFromCard,
} = require('../controllers/cards');

router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:id', deleteCardById);
router.put('/cards/:id/likes', addLikeToCard);
router.delete('/cards/:id/likes', deleteLikeFromCard);

module.exports = router;

const router = require('express').Router();
const {
  getAllCards, createCard, deleteCardById, addLikeToCard, deleteLikeFromCard,
} = require('../controllers/cards');

router.get('', getAllCards);
router.post('', createCard);
router.delete('/:id', deleteCardById);
router.put('/:id/likes', addLikeToCard);
router.delete('/:id/likes', deleteLikeFromCard);

module.exports = router;

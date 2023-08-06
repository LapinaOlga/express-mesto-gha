const mongoose = require('mongoose');
const User = require('../models/user');
const { convertUser } = require('./convertUser');

module.exports.convertCard = async (card) => {
  let likeOwners = [];

  // Запрашиваем список пользователей, которые поставили лайк
  if (card.likes.length) {
    likeOwners = await User.find({
      _id: {
        $in: card.likes.map((userId) => new mongoose.Types.ObjectId(userId)),
      },
    });
  }

  const owner = await User.findById(card.owner);

  return {
    _id: card._id,
    name: card.name,
    link: card.link,
    owner: convertUser(owner),
    createdAt: card.createdAt,
    likes: likeOwners.map((likeOwner) => convertUser(likeOwner)),
  };
};

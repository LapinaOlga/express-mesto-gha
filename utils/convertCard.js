const { convertUser } = require('./convertUser');

module.exports.convertCard = async (card) => ({
  _id: card._id,
  name: card.name,
  link: card.link,
  createdAt: card.createdAt,
  owner: convertUser(card.owner),
  likes: card.likes.map((likeOwner) => convertUser(likeOwner)),
});

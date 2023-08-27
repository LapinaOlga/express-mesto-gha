module.exports.convertUser = (user) => ({
  _id: user._id,
  name: user.name,
  about: user.about,
  avatar: user.avatar,
  email: user.email,
});

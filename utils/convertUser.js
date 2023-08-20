module.exports.convertUser = (user, isCurrentUser = false) => {
  const result = {
    _id: user._id,
    name: user.name,
    about: user.about,
    avatar: user.avatar,
  };

  // Чужой email притягивает спамеров. Отдаем только свой email
  if (isCurrentUser) {
    result.email = user.email;
  }

  return result;
};

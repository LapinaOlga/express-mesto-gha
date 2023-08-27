const NotFoundError = require('../errors/NotFoundError');

module.exports = async (req, res, next) => {
  next(new NotFoundError());
};

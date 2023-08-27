const NotFoundError = require('../errors/NotFoundError');

module.exports.notFoundMiddleware = async () => {
  throw new NotFoundError();
};

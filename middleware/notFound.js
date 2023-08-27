const { HTTP_NOT_FOUND } = require('../enums/httpCodes');

module.exports.notFoundMiddleware = async (req, res) => {
  res.status(HTTP_NOT_FOUND).send({ message: 'Page not found' });
};

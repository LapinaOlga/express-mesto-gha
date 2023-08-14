const { HTTP_NOT_FOUND } = require('../enums/httpCodes');

class NotFoundError extends Error {
  constructor(message = 'Страница не найдена') {
    super(message);
    this.status = HTTP_NOT_FOUND;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = NotFoundError;

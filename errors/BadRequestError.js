const { HTTP_BAD_REQUEST } = require('../enums/httpCodes');

class BadRequestError extends Error {
  constructor(message = 'Данные указаны неверно') {
    super(message);
    this.status = HTTP_BAD_REQUEST;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = BadRequestError;

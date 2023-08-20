const { HTTP_UNAUTHORIZED } = require('../enums/httpCodes');

class UnauthorizedError extends Error {
  constructor(message = 'Неправильные почта или пароль') {
    super(message);
    this.status = HTTP_UNAUTHORIZED;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = UnauthorizedError;

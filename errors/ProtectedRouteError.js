const { HTTP_UNAUTHORIZED } = require('../enums/httpCodes');

class ProtectedRouteError extends Error {
  constructor(message = 'Необходима авторизация') {
    super(message);
    this.status = HTTP_UNAUTHORIZED;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = ProtectedRouteError;

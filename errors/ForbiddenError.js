const { HTTP_FORBIDDEN } = require('../enums/httpCodes');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = HTTP_FORBIDDEN;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = ForbiddenError;

const { HTTP_BAD_REQUEST } = require('../enums/httpCodes');

class ValidationError extends Error {
  constructor(mongooseError) {
    const firstKey = Object.keys(mongooseError.errors)[0];
    super(mongooseError.errors[firstKey].message);
    this.status = HTTP_BAD_REQUEST;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = ValidationError;

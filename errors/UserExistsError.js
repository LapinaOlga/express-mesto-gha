const { HTTP_CONFLICT } = require('../enums/httpCodes');

class UserExistsError extends Error {
  constructor() {
    super('Пользователь с таким email уже существует');
    this.status = HTTP_CONFLICT;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = UserExistsError;

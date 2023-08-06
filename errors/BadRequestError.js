class BadRequestError extends Error {
  constructor(message = 'Данные указаны неверно') {
    super(message);
    this.status = 404;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = BadRequestError;
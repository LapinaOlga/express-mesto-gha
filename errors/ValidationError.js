class ValidationError extends Error {
  constructor(mongooseError) {
    const firstKey = Object.keys(mongooseError.errors)[0];
    super(mongooseError.errors[firstKey].message);
    this.status = 400;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = ValidationError;

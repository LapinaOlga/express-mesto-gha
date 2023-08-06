const mongoose = require('mongoose');
const validUrl = require('valid-url');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(value) {
        return validUrl.isUri(value);
      },
      message: 'Поле avatar должен содержать валидный URL',
    },
  },
});

module.exports = mongoose.model('user', userSchema);

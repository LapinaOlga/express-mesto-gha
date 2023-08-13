const { URL } = require('url');
const mongoose = require('mongoose');

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
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(value) {
        try {
          new URL(value);

          return true;
        } catch (e) {
          return false;
        }
      },
      message: 'Поле avatar должен содержать валидный URL',
    },
  },
});

module.exports = mongoose.model('User', userSchema);

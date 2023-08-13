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
    required: true,
    validate: {
      validator(value) {
        try {
          const url = new URL(value);

          return url !== null;
        } catch (e) {
          return false;
        }
      },
      message: 'Поле avatar должен содержать валидный URL',
    },
  },
});

module.exports = mongoose.model('User', userSchema);

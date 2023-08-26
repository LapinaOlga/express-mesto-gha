const mongoose = require('mongoose');
const validator = require('validator');
const { validateUrl } = require('../utils/validateUrl');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Поле name не может быть короче 2х символов'],
    maxlength: [30, 'Поле name не может быть длиннее 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Поле about не может быть короче 2х символов'],
    maxlength: [30, 'Поле about не может быть длиннее 30 символов'],
    default: 'Исследователь океана',
  },
  avatar: {
    type: String,
    default: 'https://randomwordgenerator.com/img/picture-generator/52e1d6444b56b10ff3d8992cc12c30771037dbf85254784b772872d2944e_640.jpg',
    validate: {
      validator: (v) => validateUrl(v),
      message: 'Поле avatar должно быть валидным URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Email обязателен для заполнения'],
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Поле email должно быть валидным email-адресом',
    },
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен для заполнения'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);

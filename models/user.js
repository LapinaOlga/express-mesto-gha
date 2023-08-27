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
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
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

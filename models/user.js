const mongoose = require('mongoose');
const validator = require('validator');
const { validateUrl } = require('../utils/validateUrl');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь океана',
  },
  avatar: {
    type: String,
    default: 'https://randomwordgenerator.com/img/picture-generator/52e1d6444b56b10ff3d8992cc12c30771037dbf85254784b772872d2944e_640.jpg',
    validate: {
      validator: validateUrl,
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);

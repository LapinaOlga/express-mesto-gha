const mongoose = require('mongoose');
const { validateUrl } = require('../utils/validateUrl');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле name обязательно к заполнению'],
    minlength: [2, 'Поле name не может быть короче 2х символов'],
    maxlength: [30, 'Поле name не может быть длиннее 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Поле link обязательно для заполнения'],
    validate: {
      validator: validateUrl,
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema);

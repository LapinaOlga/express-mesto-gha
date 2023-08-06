const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { authMiddleware, errorHandlerMiddleware } = require('./middleware');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use('/', userRoutes);
app.use('/', cardRoutes);

module.exports = mongoose.connect('mongodb://localhost:27017/mestodb', {
  // user: 'root',
  // pass: 'password',
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use(errorHandlerMiddleware);

app.listen(3000);
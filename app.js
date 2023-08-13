const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const {
  authMiddleware, errorHandlerMiddleware, notFoundMiddleware,
} = require('./middleware');

const app = express();

// Костыль для тестов
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});

app.use(express.json());
app.use(authMiddleware);
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

module.exports = mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(3000);

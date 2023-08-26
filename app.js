require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const signRoutes = require('./routes/sign');

// Костыль для тестов
process.env.JWT_SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');

const {
  authMiddleware, errorHandlerMiddleware, notFoundMiddleware,
} = require('./middleware');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use(signRoutes);

const mongoDsn = process.env.MONGO_DSN || 'mongodb://localhost:27017/mestodb';
module.exports = mongoose.connect(mongoDsn, {
  useNewUrlParser: true,
});

app.use(notFoundMiddleware);
app.use(errors());
app.use(errorHandlerMiddleware);

app.listen(3000);

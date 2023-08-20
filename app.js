require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const signRoutes = require('./routes/sign');

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

module.exports = mongoose.connect(process.env.MONGO_DSN, {
  useNewUrlParser: true,
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(3000);

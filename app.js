require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const signRoutes = require('./routes/sign');

// "middleware" не имеет множественной формы. Поэтому используем директорию "middleware".
const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

// Костыль для тестов
process.env.JWT_SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use(signRoutes);
app.use(notFoundMiddleware);
app.use(errors());
app.use(errorHandlerMiddleware);

const mongoDsn = process.env.MONGO_DSN || 'mongodb://localhost:27017/mestodb';
module.exports = mongoose.connect(mongoDsn, {
  useNewUrlParser: true,
});

app.listen(3000);

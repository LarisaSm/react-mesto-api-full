const express = require('express');
const serverless = require('serverless-http');
require('dotenv').config();
const cors = require('cors');
const validator = require('validator');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const routerNetlify = express.Router();

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { login, createUser, pageNotFound } = require('./controllers/users');
// const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb1', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// app.use((req, res, next) => {
//   req.user = {
//     _id: '609819352cc2317630d2fc20',
// вставьте сюда _id созданного в предыдущем пункте пользователя
//   };

//   next();
// });
app.use(express.json());

app.use(cors());
//   origin: 'https://15dev.students.nomoredomains.club',
//   credentials: true,
// }));

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required().min(2),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required().min(2),
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helpers.message('Невалидная ссылка');
    }),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);

// app.use(auth);

app.use(userRouter);
app.use(cardRouter);

app.use('*', pageNotFound);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use((err, req, res, next) => {
  // это обработчик ошибки
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});
app.use('/.netlify/functions/server', routerNetlify);  // path must route to lambda
module.exports.handler = serverless(app);

//app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  //console.log(`App listening on port ${PORT}`);
//});

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

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

app.post('/signin', login);
app.post('/signup', createUser);

// app.use(auth);

app.use(userRouter);
app.use(cardRouter);

app.get('*', pageNotFound);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errorLogger); // подключаем логгер ошибок

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

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

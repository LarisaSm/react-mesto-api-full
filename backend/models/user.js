// models/user.js
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

const validator = require('validator');

const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальная длина имени — 2 символа'], // минимальная длина имени — 2 символа
    maxlength: [30, 'Максимальная длина имени — 30 символов'], // а максимальная — 30 символов
  },
  about: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    default: 'Исследователь',
    minlength: [2, 'Минимальная длина текста — 2 символа'], // минимальная длина имени — 2 символа
    maxlength: [30, 'Максимальная длина текста — 30 символов'], // а максимальная — 30 символов
  },
  avatar: {
    // default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',

    type: String, // гендер — это строка
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /https?:\/\/[.a-z\-0-9]*\.[-._~:/?#[\]@!$&'()*+,;=a-z0-9]{0,}#?/.test(v);
      },
      message: (props) => `${props.value}  - неправильный формат ссылки!`,
    },
  },
  email: {
    type: String,
    required: [true, 'Поле емейл обязательное'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле пароль обязательное'],
    select: false, // необходимо добавить поле select
  },
});

userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }

          return user; // теперь user доступен
        })
        .catch(next);
    })
    .catch(next);
};

exports.User = mongoose.model('user', userSchema);

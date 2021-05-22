// models/user.js
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: [true, 'Поле обязательное'], // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: [2, 'Минимальная длина имени — 2 символа'], // минимальная длина имени — 2 символа
    maxlength: [30, 'Максимальная длина имени — 30 символов'], // а максимальная — 30 символов
  },
  link: {
    type: String, // гендер — это строка
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

exports.Card = mongoose.model('card', userSchema);

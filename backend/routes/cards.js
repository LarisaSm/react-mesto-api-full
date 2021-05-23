// cards.js
const express = require('express');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const auth = require('../middlewares/auth');

const cardRouter = express.Router();
const {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

cardRouter.get('/cards', auth, getCards);

cardRouter.post('/cards', auth, celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helpers.message('Невалидная ссылка');
    }),
    name: Joi.string().required().min(2).max(30),
  }),
}), createCard);

cardRouter.put('/cards/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}),
likeCard);

cardRouter.delete('/cards/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}),
dislikeCard);

cardRouter.delete('/cards/:cardId', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCard);

// router.get('/', (req, res) => {
//   res.send('hello world');
// });

// router.post('/', express.json(), (req, res) => {
//   res.send(req.body);
// });

module.exports = cardRouter;

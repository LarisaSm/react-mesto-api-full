// cards.js
const express = require('express');
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const cardRouter = express.Router();
const {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
  pageNotFound,
} = require('../controllers/cards');

cardRouter.get('/cards', auth, getCards);

cardRouter.post('/cards', auth, createCard);

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

cardRouter.get('*', pageNotFound);
cardRouter.post('*', pageNotFound);

// router.get('/', (req, res) => {
//   res.send('hello world');
// });

// router.post('/', express.json(), (req, res) => {
//   res.send(req.body);
// });

module.exports = cardRouter;

// cards.js
const express = require('express');
const auth = require('../middlewares/auth');

const cardRouter = express.Router();
const {
  getCards,
  createCard,
  getCardId,
  likeCard,
  dislikeCard,
  deleteCard,
  pageNotFound,
} = require('../controllers/cards');

cardRouter.get('/cards', auth, getCards);

cardRouter.get('/cards/:cardId', auth, getCardId);

cardRouter.post('/cards', auth, createCard);

cardRouter.put('/cards/likes/:cardId', auth, likeCard);

cardRouter.delete('/cards/likes/:cardId', auth, dislikeCard);

cardRouter.delete('/cards/:cardId', auth, deleteCard);

cardRouter.get('*', pageNotFound);
cardRouter.post('*', pageNotFound);

// router.get('/', (req, res) => {
//   res.send('hello world');
// });

// router.post('/', express.json(), (req, res) => {
//   res.send(req.body);
// });

module.exports = cardRouter;

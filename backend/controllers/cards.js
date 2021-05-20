const { Card } = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
// const ConflictError = require('../errors/ConflictError');
const ForbiddenError = require('../errors/ForbiddenError');
// const UnauthorizedError = require('../errors/UnauthorizedError');
const ValidationError = require('../errors/ValidationError');

exports.getCards = (req, res, next) => {
  Card.find({}).sort({ createdAt: -1 })
    .then((cards) => res.send(cards))
    .catch(next);
};

exports.getCardId = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким id не существует');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Введены некорректные данные');
      }
      next(err);
    })
    .catch(next);
};

exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Введены некорректные данные');
      }
      next(err);
    })
    .catch(next);
};

exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким id не существует');
      }
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((cardDelete) => {
            if (!cardDelete) {
              throw new NotFoundError('Карточки с таким id не существует');
            }
            res.status(200).send(cardDelete);
          })
          .catch(next);
      } else throw new ForbiddenError('У вас нет прав удалять эту карточку');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Введены некорректные данные');
      }
      next(err);
    })
    .catch(next);
};

exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
  // PUT /cards/:cardId/likes — поставить лайк карточке
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким id не существует');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Введены некорректные данные');
      }
      next(err);
    })
    .catch(next);
};

exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    // DELETE /cards/:cardId/likes — убрать лайк с карточки
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким id не существует');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Введены некорректные данные');
      }
      next(err);
    })
    .catch(next);
};

exports.pageNotFound = () => {
  throw new NotFoundError('Такой страницы не существует');
};

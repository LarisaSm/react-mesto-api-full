// router.js
const express = require('express');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const userRouter = express.Router();

const {
  getUsers,
  getUsersId,
  getUsersMe,
  updateUser,
  updateAvatarUser,
} = require('../controllers/users');

userRouter.get('/users', auth, getUsers);
userRouter.get('/users/me', auth, getUsersMe);
userRouter.get('/users/:userId', auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUsersId);
userRouter.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
  }),
}), updateUser);

userRouter.patch('/users/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateAvatarUser);
// userRouter.get('*', express.json(), pageNotFound);

// router.get('/', (req, res) => {
//   res.send('hello world');
// });

// router.post('/', express.json(), (req, res) => {
//   res.send(req.body);
// });

module.exports = userRouter;

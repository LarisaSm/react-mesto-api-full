// router.js
const express = require('express');
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
userRouter.get('/users/:userId', auth, getUsersId);
userRouter.patch('/users/me', auth, updateUser);

userRouter.patch('/users/me/avatar', auth, updateAvatarUser);
// userRouter.get('*', express.json(), pageNotFound);

// router.get('/', (req, res) => {
//   res.send('hello world');
// });

// router.post('/', express.json(), (req, res) => {
//   res.send(req.body);
// });

module.exports = userRouter;

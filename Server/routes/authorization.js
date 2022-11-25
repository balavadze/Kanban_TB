const { Router } = require('express');
const {
  getUsers,
  createUser,
  login,
  protected,
  logout,
  getTodo,
  createTodo,
} = require('../controllers/auth');
const { validationMiddleware } = require('../middleware/users');
const { registerValidation, loginValidation } = require('../validations/users');
const { userAuth } = require('../middleware/auth-middleware');

const router = Router();

router.get('/get-users', getUsers);
router.get('/protected', userAuth, protected);
// router.get("/logout", userAuth, logout);
router.get('/logout', logout);

router.post('/signup', registerValidation, validationMiddleware, createUser);
router.post('/dashboard', loginValidation, validationMiddleware, login);

// TODO

router.post('/new', createTodo);
router.get('/mytodo', getTodo);

module.exports = router;

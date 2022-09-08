const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/usersControllers');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundErr');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required(),
  }),
}), login);

router.use('/users', auth, require('./usersRoutes'));
router.use('/movies', auth, require('./moviesRoutes'));

router.use('/*', auth, () => {
  throw new NotFoundError('Страницы не существует');
});

module.exports = router;

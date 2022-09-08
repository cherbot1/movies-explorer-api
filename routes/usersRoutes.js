const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { updateUser, getCurrentUser } = require('../controllers/usersControllers');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(3)
      .max(30),
    email: Joi.string()
      .email({ tlds: { allow: false } }),
  }),
}), updateUser);

module.exports = router;

const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const SessionController = require('./controllers/SessionController');
const ProfileController = require('./controllers/ProfileController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8),
    }),
}), SessionController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().email().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/users', UserController.index);

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8),
    }),
}), UserController.create);

module.exports = routes;

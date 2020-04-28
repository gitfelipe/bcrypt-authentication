const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const routes = express.Router();

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8),
    }),
}), SessionController.create);

routes.get('/users', UserController.index);

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8),
    }),
}), UserController.create);

module.exports = routes;

const { hash } = require('bcrypt');

const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');

        return response.json(users);
    },

    async create(request, response) {
        const { name, email, password } = request.body;

        const hashPassword = await hash(password, 8);

        const user = await connection('users').where('email', email).first();

        if (user) {
            return response.status(401).send({ error: 'Email already exists.' });
        }

        await connection('users').insert({
            name,
            email,
            password: hashPassword,
        });

        return response.json({ name, email, password: hashPassword });
    }
};

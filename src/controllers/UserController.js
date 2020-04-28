const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');

        return response.json(users);
    },

    async create(request, response) {
        const { name, email, password } = request.body;

        await connection('users').where({ email }).first().then((user) => {
            if (!user) {
                const hash = bcrypt.hashSync(password, 10);
                connection('users').insert({
                    name,
                    email,
                    password: hash
                }).then(() => {
                    return response.json({ name, email, password: hash });
                })
            } else {
                return response.status(401).json({ error: 'Email already exists.' });
            }
        });
    }
};

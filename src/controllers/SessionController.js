const { compare } = require('bcrypt');

const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { email, password } = request.body;

        const user = await connection('users').where('email', email).first();

        if (!user) {
            return response.status(404).send({ error: 'No account found with this credentials' });
        }

        const matchPassword = await compare(password, user.password);

        if (!matchPassword) {
            return response.status(404).send({ error: 'Invalid email or password.' });
        }

        return response.json(user);
    }
};

const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    async create(request, response) {
        const { email, password } = request.body;

        await connection('users')
            .where('email', email)
            .first()
            .then((user) => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return response.json(user);
                }

                return response.status(404).json({ error: 'No account found with this credentials.' });
            });
    }
};

const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const email = request.headers.authorization;

        const user = await connection('users').where('email', email).select('name');

        return response.json(user);
    }
};

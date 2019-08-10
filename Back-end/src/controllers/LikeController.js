const Register = require('../models/Register');

module.exports = {
    async store(req, res) {

        //console.log(req.io, req.connectedUsers); //Retorna um objeto do req.io e req.connectedUsers

        const { user } = req.headers;
        const { devId } = req.params;

        const loggedUser = await Register.findById(user);
        const targetUser = await Register.findById(devId);

        if (!targetUser) {
            //Retorna um bad request
            return res.status(400).json({ error: 'Usuário inexistente!' });
        }

        if (targetUser.likes.includes(loggedUser._id)) {
            //console.log('Eita Carambia, deu match muchacho! :D');

            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match', targetUser);
            }

            if (targetSocket) {
                req.io.to(targetSocket).emit('match', loggedUser);
            }
        }

        loggedUser.likes.push(targetUser._id);

        await loggedUser.save();

        return res.json(loggedUser);
    }
};
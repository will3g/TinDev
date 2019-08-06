const Register = require('../models/Register');

module.exports = {
    async store(req, res) {

        const { user } = req.headers;
        const { devId } = req.params;

        const loggedUser = await Register.findById(user);
        const targetUser = await Register.findById(devId);

        if (!targetUser) {
            //Retorna um bad request
            return res.status(400).json({ error: 'Usuário inexistente!' });
        }

        loggedUser.dislikes.push(targetUser._id);

        await loggedUser.save();

        return res.json(loggedUser);
    }
};
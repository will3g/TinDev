const axios = require('axios');
const Register = require('../models/Register');

// Max de métodos por controller -> 5 ->>> INDEX (LISTA), SHOW (RETORNA UM ÚNICO ELEMENTO POR ID), STORE, UPDATE, DELETE

module.exports = {
    async index(req, res) {
        const { user } = req.headers; //Usuário logado

        const loggedUser = await Register.findById(user); //Usuário logado

        const users = await Register.find({ //Aqui é uma query que faz de uma vez, três filtros para buscar usuários no sistema
            $and: [
                { _id: { $ne: user } }, //Busca IDs que não seja do usuário logado. $ne -> Not Equal, que não seja igual a este ID logado
                { _id: { $nin: loggedUser.likes } }, //Essa query vai excluir todos os usuários que este usuário logado já deu like
                { _id: { $nin: loggedUser.dislikes } }, //Essa query vai excluir todos os usuários que este usuário logado já deu disike
                // Logo, só vai aparecer usuários que este usuário logado não deu like ou dislike e não vai aparecer o ID desse usuário logado na lista de busca.
            ],
        });

        return res.json(users);
    },

    async store(req, res) {
        const { username } = req.body;

        const usuarioExistente = await Register.findOne({ user: username });

        if (usuarioExistente) {
            return res.json(usuarioExistente);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Register.create({
            name,
            user: username,
            bio,
            avatar
        });

        return res.json(dev);
    }
};
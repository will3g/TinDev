const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Register',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Register',
    }],
}, {
    timestamps: true, //Cria uma coluna CreatedAt -> Armazena de forma automatica a data de cada registro, e cria outra coluna UpdatedAt que armazena a data da ultima alteração do registro
});

module.exports = model('Register', DevSchema);
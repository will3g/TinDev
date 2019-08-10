const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

//Dessa forma podemos receber requisições HTTP e WebSocket
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {

    const { user } = socket.handshake.query;

    // console.log(user, socket.id); //Primeiro o Id do usuário e segundo o Id do WebScoket

    connectedUsers[user] = socket.id;

    //console.log('Nova Conexão', socket.id);

    // //Função em tempo real, SEM FAZER REQUISIÇÕES no SERVIDOR, utilizando protocolo de WEBSOCKET
    // socket.on('hello', message => { //Aqui temos o backend enviando informações para o frontend em tempo real
    //     console.log(message)
    // });
    
    // //Função em tempo real, SEM FAZER REQUISIÇÕES no SERVIDOR, utilizando protocolo de WEBSOCKET
    // setTimeout(() => { //Aqui temos o front enviando informações para o backend em tempo real
    //     socket.emit('world', {
    //         message: 'Hello World!'
    //     });
    // }, 5000);
});

mongoose.connect('mongodb+srv://Omni:1234@cluster0-rvxaz.mongodb.net/projetomni?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
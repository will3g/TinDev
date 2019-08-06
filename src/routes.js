const express = require('express');
const Register = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const route = express.Router();

route.get('/devs', Register.index);
route.post('/devs', Register.store);
route.post('/devs/:devId/likes', LikeController.store);
route.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = route;
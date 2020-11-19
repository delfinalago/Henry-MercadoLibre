'use strict'

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/index.js');

const server = express();
const port = (process.env.PORT || 3000)

server.set('port' , port)

server.use('/', routes);
server.use(bodyParser.urlencoded({ extended: false}));
server.use(bodyParser.json());
server.use(cors());


server.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


server.listen(port, () => {
    console.log(`Corriendo en el puerto http://localhost:${port}`)
})



module.exports = server;
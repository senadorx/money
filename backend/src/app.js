const express = require('express');
const cors = require('cors');
const router = require('./router');


const app = express();
app.use(express.json());
app.use(cors());
app.use(router);


//app.get('/', (request, response) => response.status(200).send('Hello World 2'));

module.exports = app;
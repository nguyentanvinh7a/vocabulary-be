const express = require('express');
const app = express();
const http = require("http");
const cors = require('cors');

const db = require('./config/db');
var mongoose = require('mongoose');
const apiRouter = require('./routes/api');
var bodyParser = require('body-parser');

const server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(db.url, function () {
    console.log('Mongodb connected!!');
});

app.use('/api', apiRouter);

server.listen(3001, () => {
    console.log("SERVER RUNNING");
});
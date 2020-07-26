const express = require('express');
const path = require('path');

const api = require('./api');

const app = express();

app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/api', api);

module.exports = app;

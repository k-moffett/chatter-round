const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

require('./backend/routes.js')(app)

app.listen(8080, '172.31.27.62');
console.log('Server Up!')
// web server
const express = require('express');

// helps add color to messages being logged so that they are easier to read
const chalk = require('chalk');

// allows to get various level of debug info
const debug = require('debug')('app');

// helps combine filepath
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen('3000', () => {
  debug(`listening at port ${chalk.green(3000)}`);
});

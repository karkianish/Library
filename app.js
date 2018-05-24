// web server
const express = require('express');

// helps add color to messages being logged so that they are easier to read
const chalk = require('chalk');

// allows to get various level of debug info
const debug = require('debug')('app');

// helps combine filepath
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'hello again!', pageTitle: 'Library' });
});

app.listen(port, () => {
  debug(`listening at port using nodemon ${chalk.green(`${port}`)}`);
});

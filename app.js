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

const bookRouter = require('./src/routes/bookRoute');
const adminRouter = require('./src/routes/adminRouter');


// const admingRouter = require('./src/routes/adminRouter') (nav);
// the above statement calls require to adminRouter, which exports a function
// and whatever the function is returned you are passing 'nav' as a param to it.

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'hello again!', pageTitle: 'Library' });
});

app.listen(port, () => {
  debug(`listening at port using nodemon ${chalk.green(`${port}`)}`);
});

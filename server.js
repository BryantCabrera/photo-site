/********** REQUIRES **********/
require('./db/db');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const photosRouter = require('./routers/photos');
const usersRouter = require('./routers/users');

/********** MIDDLEWARE **********/
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

/********** ROUTERS/CONTROLLERS **********/
app.use('/photos', photosRouter);
app.use('/users', usersRouter);

//Index Route: Home
app.get('/', (req, res) => {
    res.render('index.ejs');
});

/********** LISTENER **********/
app.listen(3000, () => {
    console.log('Server is listening on port 3000.');
});
/********** REQUIRES **********/
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

/********** MIDDLEWARE **********/
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

/********** ROUTERS/CONTROLLERS **********/

/********** LISTENER **********/
app.listen(3000, () => {
    console.log('Server is listening on port 3000.');
});
/********** REQUIRES **********/
const express = require('express');
const router = express.Router();

const User = require('../models/users');
const Photo = require('../models/photos');

/********** MIDDLEWARE **********/

/********** ROUTES **********/
//Index Route
router.get('/', (req, res) => {
    User.find({}, (err, allUsers) => {
        if (err) {
            res.send(err);
        } else {
            res.render('../views/users/index.ejs', {
                users: allUsers
            });
        }
    });
});

//New Route
router.get('/new', (req, res) => {
    res.render('../views/users/new.ejs');
});

//Create Route

//Edit Route

//Update Route

//Show Route

//Delete Route

/********** EXPORTS **********/
module.exports = router;
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
router.post('/', (req, res) => {
    User.create(req.body, (err, createdUser) => {
        if (err) {
            res.send(err);
        } else {
            console.log(createdUser);
            res.redirect('/users');
        }
    });
});

//Edit Route
router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if (err) {
            res.send(err);
        } else {
            res.render('../views/users/edit.ejs', {
                user: foundUser
            });
        }
    });
});

//Update Route

//Show Route
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if (err) {
            res.send(err);
        } else {
            res.render('../views/users/show.ejs', {
                user: foundUser
            });
        }
    });
});

//Delete Route
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
        const photosIds = [];
        for (let i = 0; i < deletedUser.photos.length; i++) {
            photosIds.push(deletedUser.photos[i]._id);
        }

        Photo.deleteMany(
            {
                _id: {
                    $in: photoIds
                }
            },
            (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    console.log(deletedUser);
                    res.redirect('/users');
                }
            }
        ); 
    });
});

/********** EXPORTS **********/
module.exports = router;
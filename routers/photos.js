/********** REQUIRES **********/
const express = require('express');
const router = express.Router();

const Photo = require('../models/photos');

/********** MIDDLEWARE **********/

/********** ROUTES **********/
//Index Route
router.get('/', (req, res) => {
    Photo.find({}, (err, allPhotos) => {
        if (err) {
            res.send(err);
        } else {
            res.render('../views/photos/index.ejs', {
                photos: allPhotos
            });
        }
    });
});

//New Route
router.get('/new', (req, res) => {
    User.find({}, (err, allUsers) => {
        res.render('../views/photos/new.ejs', {
            users: allUsers
        });
    });
});

//Create Route
router.post('/', (req, res) => {
    User.findById(req.body.userId, (err, foundUser) => {
        console.log(err, foundUser);
        Photo.create(req.body, (err, createdPhoto) => {
            if (err) {
                res.send(err);
            } else {
                console.log(createdPhoto);

                foundUser.photos.push(createdPhoto);

                foundUser.save((err, data) => {
                    res.redirect('/photos');
                });
            }
        });
    }); 
});

//Edit Route
router.get('/:id/edit', (req, res) => {
    Photo.findById(req.params.id, (err, foundPhoto) => {
        if (err) {
            res.send(err);
        } else {
            res.render('../views/photos/edit.ejs', {
                photo: foundPhoto
            });
        }
    });
});

//Update Route
router.put('/:id', (req, res) => {
    Photo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, foundPhoto) => {
        if (err) {
            res.send(err);
        } else {
            console.log(foundPhoto);
            res.redirect('/photos');
        }
    });
});

//Show Route
router.get('/:id', (req, res) => {
    Photo.findById(req.params.id, (err, foundPhoto) => {
        if (err) {
            res.send(err);
        } else {
            res.render('../views/photos/show.ejs', {
                photo: foundPhoto
            });
        }
    });
});

//Delete Route
router.delete('/:id', (req, res) => {
    Photo.findByIdAndRemove(req.params.id, (err, deletedPhoto) => {
        if (err) {
            res.send(err);
        } else {
            console.log(deletedPhoto);
            res.redirect('/photos');
        }
    });
});


/********** EXPORTS **********/
module.exports = router;
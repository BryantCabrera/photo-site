/********** REQUIRES **********/
const express = require('express');
const router = express.Router();

const Photo = require('../models/photos');
const User = require('../models/users');

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
        User.find({}, (err, allUsers) => {
            User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
                console.log(foundUser);

                if (err) {
                    res.send(err);
                } else {
                    res.render('../views/photos/edit.ejs', {
                        photo: foundPhoto,
                        users: allUsers,
                        photoUser: foundUser
                    });
                }
            });
        });
        
    });
});

//Update Route
router.put('/:id', (req, res) => {
    Photo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPhoto) => {
        User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
            //remove photo from original user
            foundUser.photos.id(req.params.id).remove();

            if(foundUser._id.toString() !== req.body.userId) {
                //find new user
                foundUser.save((err, savedFoundUser) => {
                    //update the new user's collection
                    User.findById(req.body.userId, (err, newUser) => {
                        //updated photo has a mongo id
                        newUser.photos.push(updatedPhoto);

                        //save the newUser
                        newUser.save((err, savedNewUser) => {
                            res.redirect('/photos');
                        })
                    });
                    
                });
            } else {
                foundUser.photos.push(updatedPhoto);

                foundUser.save((err, data) => {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log(updatedPhoto);
                        res.redirect('/photos');
                    }
                });
            }
        });
    });
});

//Show Route
router.get('/:id', (req, res) => {
    Photo.findById(req.params.id, (err, foundPhoto) => {

        User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
            if (err) {
                res.send(err);
            } else {
                res.render('../views/photos/show.ejs', {
                    photo: foundPhoto,
                    user: foundUser
                });
            }
        });
    });
});

//Delete Route
router.delete('/:id', (req, res) => {
    Photo.findByIdAndRemove(req.params.id, (err, deletedPhoto) => {
        User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
            foundUser.photos.id(req.params.id).remove();
            foundUser.save((err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    console.log(deletedPhoto);
                    res.redirect('/photos');
                }
            });
        });   
    });
});


/********** EXPORTS **********/
module.exports = router;
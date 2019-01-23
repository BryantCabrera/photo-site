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
            console.log(err);
        } else {
            res.render('../views/photos/index.ejs', {
                photos: allPhotos
            });
        }
    });
});

//New Route
router.get('/new', (req, res) => {
    res.render('../views/photos/new.ejs');
});

//Create Route
router.post('/', (req, res) => {
    Photo.create(req.body, (err, createdPhoto) => {
        if (err) {
            console.log(err);
        } else {
            console.log(createdPhoto);
            res.redirect('/photos');
        }
    });
});

//Edit Route
router.get('/:id/edit', (req, res) => {
    
});

//Update Route
router.put('/:id', (req, res) => {
    
});

//Show Route
router.get('/:id', (req, res) => {
    Photo.findById(req.params.id, (err, foundPhoto) => {
        if (err) {
            console.log(err);
        } else {
            res.render('../views/photos/show.ejs', {
                photo: foundPhoto
            });
        }
    });
});

//Delete Route
router.delete('/:id', (req, res) => {
    
});

/********** EXPORTS **********/
module.exports = router;
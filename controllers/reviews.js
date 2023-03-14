/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/applications`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (All Reviews): 
// GET localhost:3000/applications/
router.get('/', (req, res) => {
    db.Song.find({}, { reviews: true, _id: false })
        .then(songs => {
            // format query results to appear in one array, 
            // rather than an array of objects containing arrays 
            const flatList = []
            for (let song of songs) {
                flatList.push(...song.reviews)
            }
            res.render('reviews/review-index.ejs', {
                apps: flatList
            })
        })
});

// New Route: GET localhost:3000/reviews/new/:songId
router.get('/new/:songId', (req, res) => {
    db.Song.findById(req.params.petId)
        .then(song => {
            res.render('reviews/new-review', { song: song })
        })
})

// Create Route: POST localhost:3000/reviews/create/:songId
router.post('/create/:songId', (req, res) => {
    db.Song.findByIdAndUpdate(
        req.params.songId,
        { $push: { applications: req.body } },
        { new: true }
    )
        .then(() => res.redirect('/reviews'))
});

// Show Route: GET localhost:3000/reviews/:id
router.get('/:id', (req, res) => {
    db.Song.findOne(
        { 'reviews._id': req.params.id },
        { 'reviews.$': true, _id: false }
    )
        .then(song => {
            // format query results to appear in one object, 
            // rather than an object containing an array of one object
            res.render('reviews/reviews-details', {
                app: song.reviews[0]
            })
        })
});

// Destroy Route: DELETE localhost:3000/reviews/:id
router.delete('/:id', (req, res) => {
    db.Song.findOneAndUpdate(
        { 'reviews._id': req.params.id },
        { $pull: { reviews: { _id: req.params.id } } },
        { new: true }
    )
        .then(song => res.json(song))
});


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
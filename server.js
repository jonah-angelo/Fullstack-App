/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require('method-override');

/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');

/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const songsCtrl = require('./controllers/songs')
const reviewsCtrl = require('./controllers/reviews')


/* Create the Express app
--------------------------------------------------------------- */
const app = express();

/* Configure the app to refresh the browser when nodemon restarts
--------------------------------------------------------------- */
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

/* Configure the app (app.set)
--------------------------------------------------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Middleware (app.use)
--------------------------------------------------------------- */
// Indicates where our static files are located
app.use(express.static('public'))
// Use the connect-livereload package to connect nodemon and livereload
app.use(connectLiveReload());
// Body parser: used for POST/PUT/PATCH routes: 
// this will take incoming strings from the body that are URL encoded and parse them 
// into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
// Allows us to interpret POST requests from the browser as another request type: DELETE, PUT, etc.
app.use(methodOverride('_method'));


/* Mount routes
--------------------------------------------------------------- */
app.get('/', function (req, res) {
    db.Song.find({ isFeatured: true })
        .then(songs => {
            res.render('home', {
                songs: songs
            })
        })
});

// When a GET request is sent to `/seed`, the pets collection is seeded
app.get('/seed', function (req, res) {
    // Remove any existing pets
    db.Song.deleteMany({})
        .then(removedSongs => {
            console.log(`Removed ${removedSongs.length} songs`)

            // Seed the pets collection with the seed data
            db.Song.insertMany(db.seedSongs)
                .then(addedSongs => {
                    console.log(`Added ${addedSongs.length} songs to be adopted`)
                    res.json(addedSongs)
                })
        })
});

// Render the about page
app.get('/about', function (req, res) {
    res.render('about')
});

// This tells our app to look at the `controllers/pets.js` file 
// to handle all routes that begin with `localhost:3000/pets`
app.use('/songs', songsCtrl)

// This tells our app to look at the `controllers/applications.js` file 
// to handle all routes that begin with `localhost:3000/applications`
app.use('/reviews', reviewsCtrl)

// The "catch-all" route: Runs for any other URL that doesn't match the above routes
app.get('*', function (req, res) {
    res.render('404')
});

/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
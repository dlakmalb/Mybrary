// If not running in the production environment then use env file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Import express from the express library
const express = require('express');
const app     = express();

// Get the express layouts package
const expressLayouts = require('express-ejs-layouts');

// Get the express body parser package
const bodyParser = require('body-parser');

// Include method-override package to make PUT and DELETE requests
const methodOverride = require('method-override');

// Setup ejs as view engine
app.set('view engine', 'ejs');

// Set views directory
app.set('views', __dirname + '/views');

// Set express layouts directory
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

// Import mongoose to server
const mongoose = require('mongoose');

// Setup connection for database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create mongo db connection
const db = mongoose.connection;

db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

// Import the routers to the server
const indexRouter  = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter   = require('./routes/books');

// use routers
app.use('/', indexRouter)
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

app.listen(process.env.PORT || 3000);

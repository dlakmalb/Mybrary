const express = require('express');
const router  = express.Router();
const Author  = require('../models/author');

// All authors route
router.get('/', async (req, res) => {
    let searchOptions = {};

    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }

    try {
        // Find all the authors from db
        const authors = await Author.find(searchOptions);

        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        });
    } catch (error) {
        res.redirect('/');
    }
});

// New author route to display the form
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
});

// Add new author route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await author.save();

        // res.redirect(`author/${newAuthor.id}`);
        res.redirect('authors');
    } catch (error) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author',
        });
    }
});

module.exports = router;
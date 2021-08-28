const mongoose = require('mongoose');
const Book     = require('./book');

// Setup schema for author
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// When deleting an author check if there is a book related to that author
authorSchema.pre('remove', function (next) {
    Book.find({ author: this.id }, (err, books) => {
        if (err) {
            next(err);
        } else if (books.length > 0) {
            next(new Error('This author has books.'));
        } else {
            next();
        }
    });
});

// Export author schema
module.exports = mongoose.model('Author', authorSchema);

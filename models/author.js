const mongoose = require('mongoose');

// Setup schema for author
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// Export author schema
module.exports = mongoose.model('Author', authorSchema);

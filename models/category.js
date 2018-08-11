var mongoose = require('mongoose');

// Category Schema
var CategorySchema = mongoose.Schema({
   
    title: {
        type: String,
        required: true,
        es_type: 'text'
    },
    slug: {
        type: String,
        es_type: 'text'
    }
    
});

var Category = module.exports = mongoose.model('Category', CategorySchema);


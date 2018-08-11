var mongoose = require('mongoose');

// Page Schema
var PageSchema = mongoose.Schema({
   
    title: {
        type: String,
        required: true,
        es_type: 'text'
    },
    slug: {
        type: String,
        es_type: 'text'
    },
    content: {
        type: String,
        required: true,
        es_type: 'text'
    },
    sorting: {
        type: Number
    }
    
});

var Page = module.exports = mongoose.model('Page', PageSchema);


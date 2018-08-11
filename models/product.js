var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');

// Product Schema
var ProductSchema = mongoose.Schema({
   
    title: {
        type: String,
        required: true,
        es_type: 'text'
    },
    slug: {
        type: String,
        es_type: 'text'
    },
    desc: {
        type: String,
        required: true,
        es_type: 'text'
    },
    category: {
        type: String,
        required: true,
        es_type: 'text'
    },
    price: {
        type: Number,
        required: true,
        es_type: 'long'

    },
    image: {
        type: String,
        es_type: 'text'
    }
    
});
// ProductSchema.plugin(mongoosastic, {
//   hosts: [
//     'localhost:9200'
//   ]
// });

var Product = module.exports = mongoose.model('Product', ProductSchema);


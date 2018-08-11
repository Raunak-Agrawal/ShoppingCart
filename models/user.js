var mongoose = require('mongoose');

// User Schema
var UserSchema = mongoose.Schema({
   
    name: {
        type: String,
        required: true,
        es_type: 'text'
    },
    email: {
        type: String,
        required: true,
        es_type: 'text'
    },
    username: {
        type: String,
        required: true,
        es_type: 'text'
    },
    password: {
        type: String,
        required: true,
        es_type: 'text'
    },
    admin: {
        type: Number
    },
    
    secretToken:{
        type:String
    },
    active:{
        type:Boolean
    }
});

var User = module.exports = mongoose.model('User', UserSchema);


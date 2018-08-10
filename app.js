var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/database');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var fileUpload  = require('express-fileupload');
var passport = require('passport');
//connect to db
mongoose.connect(config.database);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected to database');
});

//Init App
var app = express();

//view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//set public folder

app.use(express.static(path.join(__dirname, 'public')));

//set global errors

app.locals.errors= null;

//Get page model

var Page = require('./models/page');
 Page.find({}).sort({sorting: 1}).exec(function (err, pages) {
        if(err){
          console.log(err);
        }
        else{
          app.locals.pages=pages;

        }
    });

 //Get category model
 var Category = require('./models/category');
 Category.find(function (err, categories) {
        if(err){
          console.log(err);
        }
        else{
          app.locals.categories=categories;

        }
    });

//express file upload middleware
app.use(fileUpload());

//bodyparser middleware
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//session middleware

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
   //cookie: { secure: true }
}));

//express validator middle ware

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  },
  customValidators:{
    isImage: function(value, filename){
      var extension=( path.extname(filename)).toLowerCase();
      switch(extension){
        case '.jpg':
          return '.jpg';
        case '.jpeg':
          return '.jpeg';
        case '.png':
          return '.png';
        case '':
          return '.jpg';
        default:
        return false;
      }
    }
  }
}));

//express messages middleware

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//passportt config
require('./config/passport')(passport);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Get cart available everywhere

app.get('*',function(req,res,next){
  res.locals.cart= req.session.cart;
  res.locals.user= req.user || null;
  next();
})

//set routes
var pages = require('./routes/pages.js');
var users = require('./routes/users.js');
var cart = require('./routes/cart.js');
var products = require('./routes/products.js');
var adminPages = require('./routes/admin_pages.js');
 var adminCategories = require('./routes/admin_categories.js');
 var adminProducts = require('./routes/admin_products.js');


app.use('/admin/pages',adminPages);
app.use('/products',products);
app.use('/admin/categories',adminCategories);
 app.use('/admin/products',adminProducts);
app.use('/',pages);
app.use('/cart',cart);
app.use('/users',users);





app.listen(3000, function() {
	console.log('server on port started');
});
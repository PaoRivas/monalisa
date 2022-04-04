const express = require('express');
const morgan = require('morgan');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const {isLoggedIn} = require('./lib/auth')

//inizialitations
const app = express();
// Here runs the database.js and then keys.js
require("./lib/passport");

//settings
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set("layout extractScripts", true);

//middlewares, se ejecutan cuando un cliente envia una peticion al servidor

app.use(session({
  secret: 'mssqlnodesession',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());
app.use(morgan('dev')); //muestra lo que llega al servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressLayouts);
app.use(fileUpload());

//public
app.use(express.static(path.join(__dirname, 'public')));

//Check user log in
app.use(isLoggedIn);

//global variables
app.use((req, res, next) => {
  app.locals.message = req.flash('message')[0];
  app.locals.success = req.flash('success')[0];
  app.locals.user = req.user;
  next();
});

//routes, urls de nuestro servidor
app.use('/', require('./routes'));


//starting the server
app.listen(app.get('port'), () => {
  console.log("server on port", app.get('port'));
})



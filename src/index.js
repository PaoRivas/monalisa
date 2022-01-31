const express = require('express');
const morgan = require('morgan');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
//const passport = require('passport');

//inizialitations
const app = express();
//require("./lib/passport");

//settings
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

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
//app.use(passport.initialize());
//app.use(passport.session());

//global variables
app.use((req, res, next) => {
  /* app.locals.message = req.flash('message'); */
  app.locals.success = req.flash('success');
  next();
});

//routes, urls de nuestro servidor
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//public
//app.use(express.static(path.join(__dirname), 'public'));

//starting the server
app.listen(app.get('port'), () => {
  console.log("server on port", app.get('port'));
})


// const express = require('express');
// const morgan = require('morgan');
// const path = require('path');
// const flash = require('connect-flash');
// const session = require('express-session');
//const MssqlStore = require('mssql-session-store')(session); 
// const pool = require('./database');
const {sqlConnectionConfig} = require('./keys')
// const sql = require('mssql')
// //const passport = require('passport');

// //inizialitations
// const app = express();
// //require("./lib/passport");

// //settings
// app.set('port', process.env.PORT || 4000);
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '/views'));

// //middlewares, se ejecutan cuando un cliente envia una peticion al servidor
// //let test = sql.connect(sqlConnectionConfig).then

// sql.connect(sqlConnectionConfig).then(pool => {
//     var options = {
//         ttl: 3600,
//         reapInterval: 3600,
//         reapCallback: function() { console.log('expired sessions were removed'); }
//     };
    
//     app.use(session({
//         secret: 'mssqlnodesession',
//         resave: false,
//         saveUninitialized: false,
//         store: new MssqlStore(options) // see options below
//     }));

//     app.use(flash());
//     console.log(app);

//     app.use(morgan('dev')); //muestra lo que llega al servidor
//     app.use(express.json());
//     app.use(express.urlencoded({extended: true}));
//     //app.use(passport.initialize());
//     //app.use(passport.session());

//     //global variables
//     app.use((req,res,next) => {
//         /* app.locals.message = req.flash('message'); */
//         app.locals.success = req.flash('success');
//         next();
//     });

//     //routes, urls de nuestro servidor
//     app.use(require('./routes'));
//     app.use(require('./routes/authentication'));
//     app.use('/links', require('./routes/links'));

//     //public
//     //app.use(express.static(path.join(__dirname), 'public'));

//     //starting the server
//     app.listen(app.get('port'), () => {
//         console.log("server on port", app.get('port'));
//     })
// })

var express = require('express');
var session = require('express-session');
var sql = require('mssql');
var MssqlStore = require('mssql-session-store')(session);

var dbConfig = {
  server: "localhost\\sqlexpress",
  database: "sessiontest",
  user: "sa",
  password: "atonan"
};

var callbackReip = function(error) { console.log('Error:', error)};

var start = function(callback) {
  callback = callback || function() {};

  sql.connect(sqlConnectionConfig, function(err) {
    if (err) return callback(err);
    var app = express();
    app.use(session({
      secret: '991E6B44882C4593A46C0DDFCA23E06A',
      resave: false,
      saveUninitialized: false,
      store: new MssqlStore({ reapInterval: 10, ttl: 10, reapCallback: callbackReip})
    }));

    app.get('/', async function (req, res) {
      req.session.visits = (req.session.visits || 0) + 1;
      res.send('You have visited ' + req.session.visits + ' times.');

      // const request = new sql.Request(undefined);
      // const result = await request.query('SELECT * FROM users');
      // const users = result.recordset;
      // res.send(users);
    });

    var server = app.listen(3000, function (err) {
      if (err) return callback(err);
      callback();
    });
  });
};

if (require.main === module) {
  start();
}
else {
  module.exports = { start: start };
}



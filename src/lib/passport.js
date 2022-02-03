const mssql = require('mssql');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers')

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    await pool.connect();
    const request = await pool.request();
    request.input('username', mssql.VarChar(100), username);
    const rows = await request.query('SELECT * FROM usuarios WHERE username = @username');
    if (rows.recordset.length > 0){
        const user = rows.recordset[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword){
            done(null, user, req.flash('success', 'Welcome' + user.username));
        }else{
            done(null, false, req.flash('message', 'incorrect password'));
        }
    }else{
        return done(null, false, req.flash('message', 'username doesnt exist'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const {fullname} = req.body;
    newUser = {
        username,
        password,
        fullname
    };
    await pool.connect();
    const request = await pool.request();
    password = await helpers.encryptPassword(password);
    request.input('username', mssql.VarChar(100), username);
    request.input('password', mssql.VarChar(100), password);
    request.input('fullname', mssql.VarChar(45), fullname);
    const result_id = await request.query('INSERT INTO [dbo].[usuarios] (username, fullname, password)  OUTPUT inserted.id VALUES (@username, @fullname, @password)');
    newUser.id = result_id.recordset[0].id;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const request = await pool.request();
    request.input('idos', mssql.Int, id);
    const rows = await request.query('SELECT * FROM usuarios WHERE id = @idos');
    done(null, rows.recordset[0]);
})


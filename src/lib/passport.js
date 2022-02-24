//const mssql = require('mssql');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {getConnection, mssql} = require('../database');
const helpers = require('./helpers')

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    
    const pool = await getConnection();
    const request = await pool.request();
    request.input('email', mssql.VarChar(100), email);
    const rows = await request.query('SELECT * FROM usuarios WHERE email = @email');
    if (rows.recordset.length > 0){
        const user = rows.recordset[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword){
            done(null, user, req.flash('success', 'Welcome' + user.name));
        }else{
            done(null, false, req.flash('message', 'incorrect password'));
        }
    }else{
        return done(null, false, req.flash('message', 'username doesnt exist'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    
    const {fullname, cellphone, identity} = req.body;
    newUser = {
        email,
        password,
        fullname,
        cellphone,
        identity
    };
    const pool = await getConnection();
    const request = await pool.request();
    password = await helpers.encryptPassword(password);
    request.input('email', mssql.VarChar(100), email);
    request.input('password', mssql.VarChar(100), password);
    request.input('fullname', mssql.VarChar(45), fullname);
    request.input('cellphone', mssql.VarChar(15), cellphone);
    request.input('identity', mssql.VarChar(15), identity);
    request.input('requestDate', mssql.DateTime, new Date());
    const result_id = await request.query(
        `INSERT INTO [dbo].[usuarios] 
        (rol_id, nombre, email, password, celular, c_identidad, intentos, inactivo, fecha_password, creado, creador, modificado, modificador)  
        OUTPUT inserted.id VALUES 
        (1, @fullname, @email, @password, @cellphone, @identity, 1, 0, @requestDate, @requestDate, 1, @requestDate, 1)`
    );
    newUser.id = result_id.recordset[0].id;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const pool = await getConnection();
    const request = await pool.request();
    request.input('id', mssql.Int, id);
    const rows = await request.query('SELECT * FROM usuarios WHERE id = @id');
    done(null, rows.recordset[0]);
})


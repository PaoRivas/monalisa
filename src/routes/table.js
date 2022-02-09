const express = require('express');
const router = express.Router();

const {getConnection, mssql} = require('../database');
const {isLoggedIn} = require('../lib/auth')

router.get('/table', isLoggedIn, async (req, res) => {
    const pool = await getConnection();
    const request = await pool.request();
    const result = await request.query('SELECT * FROM users');
    const users = result.recordset;
    //console.log(users);
    res.render('table', {users});
})

module.exports = router;
//const mssql = require('mssql'); 
const time = require('../lib/time')
const express = require('express');
const router = express.Router();

const {getConnection, mssql} = require('../database');

router.get('/add', async (req, res) => {
    res.render('links/add');
    /* const connection = await pool.connect();
    const result = await connection.query('SELECT * FROM users');
    connection.close();
    res.send(result); */
})

router.post('/add', async (req, res) => {
    const {business_name, bd_name} = req.body;
    /*const newLink = {
        business_name, 
        bd_name
    };
    console.log(newLink);*/
    //const userid = req.user.id;
    const pool = await getConnection();
    const request = await pool.request();
    request.input('firstName', mssql.VarChar(50), business_name);
    request.input('lastName', mssql.VarChar(50), bd_name);
    request.input('requestDate', mssql.DateTime, new Date());
    //await pool.query('INSERT INTO business set ?', [newLink]);
    try {
        const result = await request.query(
          `INSERT INTO [dbo].[users]
            (first_name, last_name, created)
            VALUES
            (@firstName, @lastName, @requestDate)`
        );
        //console.log(result);
        req.flash('success', 'Link Saved Successfully');
        res.redirect('/links');
    } catch (ex) {
        res.status(500).send(ex);
    }
    //console.log('Happy monday');  
    //connection.close();
    //res.send('received');
})

router.get('/', async (req, res) => {
  const pool = await getConnection();
  const request = await pool.request();
  const result = await request.query('SELECT * FROM users');
  const users = result.recordset;
  //console.log(users);
  //res.send('lista aqui');
  res.render('links/list', {users, time});
  //connection.close();
})

router.get('/delete/:id', async (req, res) => {
  const pool = await getConnection();
  const request = await pool.request();
  const { id } = req.params;
  request.input('idos', mssql.Int, id);
  await request.query('DELETE FROM users WHERE id = @idos');
  req.flash('success', 'Link Removed Successfully');
  res.redirect('/links');
  //connection.close();
})

router.get('/edit/:id', async (req, res) => {
  const pool = await getConnection();
  const request = await pool.request();
  const { id } = req.params;
  request.input('idos', mssql.Int, id);
  const result = await request.query('SELECT * FROM users WHERE id = @idos');
  const user = result.recordset;
  res.render('links/edit', {user: user[0]});
  //connection.close();
})

router.post('/edit/:id', async (req, res) => {
  const {business_name, bd_name} = req.body;
  const pool = await getConnection();
  const request = await pool.request();
  const { id } = req.params;
  request.input('idos', mssql.Int, id);
  request.input('firstName', mssql.VarChar(50), business_name);
  request.input('lastName', mssql.VarChar(50), bd_name);
  await request.query('UPDATE users SET first_name = @firstName, last_name = @lastName WHERE id = @idos');
  req.flash('success', 'Link Updated Successfully');
  res.redirect('/links');
  //connection.close();
})

module.exports = router;
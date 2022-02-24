const time = require('../lib/time')
const express = require('express');
const router = express.Router();
const UsersRepo = require('../db/users.repo')

router.get('/add', async (req, res) => {
    res.render('user/add');
})

router.post('/add', async (req, res) => {
    try {
      await UsersRepo.addUser(req.body)
      req.flash('success', 'Link Saved Successfully');
      res.redirect('/user');
    } catch (ex) {
      res.status(500).send(ex);
    }
})

router.get('/', async (req, res) => {
  const users = await UsersRepo.getUsers()
  res.render('user/index', {users, time});
})

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await UsersRepo.deleteUser(id);
  req.flash('success', 'Link Removed Successfully');
  res.redirect('/user');

})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const user = await UsersRepo.getUser(id)
  res.render('user/edit_form', {user: user[0], layout: false});
})

router.post('/edit/:id', async (req, res) => {
  const {fullname, email, cellphone, identity} = req.body;
  const { id } = req.params;
  user = {fullname, email, cellphone, identity, id};
  await UsersRepo.updateUser(user);
  req.flash('success', 'Link Updated Successfully');
  res.redirect('/user');
})

module.exports = router;
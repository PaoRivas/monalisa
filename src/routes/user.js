const time = require('../lib/time');
const express = require('express');
const router = express.Router();
const UsersRepo = require('../db/users.repo');
const RolesRepo = require('../db/roles.repo');

router.get('/add', async (req, res) => {
    const roles = await RolesRepo.getRoles();
    res.render('user/add_form', {roles, layout: false});
})

router.post('/add', async (req, res) => {
    try {
      await UsersRepo.addUser(req.body)
      req.flash('success', 'Saved Successfully');
      res.redirect('/user');
    } catch (ex) {
      res.status(500).send(ex);
    }
})

router.get('/', async (req, res) => {
  const users = await UsersRepo.getUsers();
  const role = await RolesRepo.getRoles();
  res.render('user/index', {users, time});
})

router.get('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await UsersRepo.deleteUser(id);
    res.json({ok: "Se elimino el registro."});
  } catch (error) {
    res.json({error: "Ocurrio un error al eliminar el registro."});
  }
})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const user = await UsersRepo.getUser(id);
  const roles = await RolesRepo.getRoles();
  res.render('user/edit_form', {user: user[0], roles, layout: false});
})

router.post('/edit/:id', async (req, res) => {
  const {role, fullname, email, cellphone, identity} = req.body;
  const { id } = req.params;
  const user = {role, fullname, email, cellphone, identity, id};
  await UsersRepo.updateUser(user);
  req.flash('success', 'Updated Successfully');
  res.redirect('/user');
})

module.exports = router;
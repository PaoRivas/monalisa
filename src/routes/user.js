const time = require('../lib/time');
const express = require('express');
const router = express.Router();
const {checkPermisos} = require('../lib/auth');
const UsersRepo = require('../db/users.repo');
const RolesRepo = require('../db/roles.repo');
const CasesRepo = require('../db/cases.repo');
const TypesofCasesRepo = require('../db/typesofcases.repo');

router.get('/add', async (req, res) => {
    const roles = await RolesRepo.getRoles();
    res.render('user/add_form', {roles, layout: false});
})

router.post('/add', async (req, res) => {
    try {
      const user_id = await UsersRepo.addUser(req.body)
      const data = user_id[0][0].id
      const {fullname} = req.body
      req.flash('success', 'Saved Successfully');
      res.json({ok: "Se creó el registro.", data, fullname});
    } catch (ex) {
      res.json({error: ex});
    }
})

router.get('/', checkPermisos, async (req, res) => {
  const roles = await RolesRepo.getRoles();
  const usersU = await UsersRepo.getUsers();
  const users = usersU.map((user) => {
    const descripcion = roles.filter(x => x.id === user.rol_id)[0]?.descripcion;
    return {
      ...user,
      descripcion
    }
  });
  res.render('user/index', {users, roles, time});
})

router.get('/cases/:id', async (req, res) => {
  const { id } = req.params;
  const cases = await CasesRepo.getCasesbyUser(id);
  const types = await TypesofCasesRepo.getTypes();
  const users = await UsersRepo.getUsers();
  const roles = await RolesRepo.getRoles();
  res.render('cases/index', {cases, types, users, roles});
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
  res.render('user/edit_modal', {user: user[0], roles, layout: false});
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
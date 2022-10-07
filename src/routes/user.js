const time = require('../lib/time');
const express = require('express');
const router = express.Router();
const {checkPermisos} = require('../lib/auth');
const UsersRepo = require('../db/users.repo');
const RolesRepo = require('../db/roles.repo');
const SucursalRepo = require('../db/sucursal.repo')
const CasesRepo = require('../db/cases.repo');
const TypesofCasesRepo = require('../db/typesofcases.repo');
const SincronizacionRepo = require('../db/sincro.repo');

router.get('/', checkPermisos, async (req, res) => {
  const roles = await RolesRepo.getRoles();
  const sucursales = await SucursalRepo.getSucursales();
  const tipos = await SincronizacionRepo.getTiposDocumento();
  const usersU = await UsersRepo.getUsers();
  const users = usersU.map((user) => {
    const rol = roles.filter(x => x.id === user.rol_id)[0]?.descripcion;
    const sucursal = sucursales.filter(x => x.id === user.sucursal_id)[0]?.nombre;
    const userC = usersU.filter(x => x.id === user.creador)[0]?.nombre;
    const userM = usersU.filter(x => x.id === user.modificador)[0]?.nombre;
    return {
      ...user,
      rol,
      sucursal,
      userC,
      userM
    }
  });
  res.render('user/index', {users, roles, sucursales, tipos});
})

router.post('/add', async (req, res) => {
    try {
      const user = {...req.body, creador:req.user.id}
      const user_id = await UsersRepo.addUser(user)
      const data = user_id[0][0].id
      const {fullname} = req.body
      req.flash('success', 'Saved Successfully');
      res.json({ok: "Se creó el registro.", data, fullname});
    } catch (ex) {
      res.json({error: ex});
    }
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
  const sucursales = await SucursalRepo.getSucursales();
  const tipos = await SincronizacionRepo.getTiposDocumento();
  res.render('user/edit_modal', {user, roles, sucursales, tipos, layout: false});
})

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const user = {...req.body, id, modificador: req.user.id};
  await UsersRepo.updateUser(user);
  req.flash('success', 'Updated Successfully');
  res.redirect('/usuarios');
})

router.get('/casos/:id', async (req, res) => {
  const { id } = req.params;
  const cases = await CasesRepo.getCasesbyUser(id);
  const types = await TypesofCasesRepo.getTypes();
  const users = await UsersRepo.getUsers();
  const roles = await RolesRepo.getRoles();
  res.render('cases/index', {cases, types, users, roles});
})

module.exports = router;
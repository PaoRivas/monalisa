const express = require('express');
const router = express.Router();
const {checkPermisos} = require('../lib/auth');
const RolesRepo = require('../db/roles.repo');
const FunctionsRepo = require('../db/functions.repo');
const PermissionsRepo = require('../db/permissions.repo');

router.get('/add', async (req, res) => {
  res.render('role/add_form', {functions, layout: false});
})

router.post('/add', async (req, res) => {
    try {
      const {check} = req.body;
      const rolId = await RolesRepo.addRol(req.body);
      await PermissionsRepo.addPermissions(rolId, check);
      req.flash('success', 'Saved Successfully');
      res.redirect('/role');
    } catch (ex) {
      res.status(500).send(ex);
    }
})

router.get('/',checkPermisos , async (req, res) => {
  const roles = await RolesRepo.getRoles();
  const functions = await FunctionsRepo.getFunctions();
  res.render('role/index', {roles, functions});
})

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await RolesRepo.deleteRol(id);
  req.flash('success', 'Removed Successfully');
  res.redirect('/role');

})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const role = await RolesRepo.getRol(id)
  const functions = await FunctionsRepo.getFunctions();
  const permissions = await PermissionsRepo.getPermissionsByRole(id);
  const arr = permissions.map(x => {
    return x.funcion_id;
  } )
  res.render('role/edit_modal', {role: role[0], functions, arr, layout: false});
})

router.post('/edit/:id', async (req, res) => {
  const {description, check} = req.body;
  const { id } = req.params;
  const rol = {description, id};
  await RolesRepo.updateRol(rol);
  await PermissionsRepo.deletePermissionsbyRole(id);
  await PermissionsRepo.addPermissions(id, check);
  req.flash('success', 'Updated Successfully');
  res.redirect('/role');
})

module.exports = router;
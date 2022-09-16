const express = require('express');
const router = express.Router();
const {checkPermisos} = require('../lib/auth');
const RolesRepo = require('../db/roles.repo');
const RutasRepo = require('../db/rutas.repo');
const PermissionsRepo = require('../db/permissions.repo');

router.get('/', checkPermisos, async (req, res) => {
  const roles = await RolesRepo.getRoles();
  const rutas = await RutasRepo.getRutas();
  res.render('role/index', {roles, rutas});
})

router.post('/add', async (req, res) => {
    try {
      const {check} = req.body;
      const rolId = await RolesRepo.addRol(req.body);
      await PermissionsRepo.addPermissions(rolId, check);
      req.flash('success', 'Saved Successfully');
      res.redirect('/roles');
    } catch (ex) {
      res.status(500).send(ex);
    }
})

router.get('/delete/:id', async (req, res) => {
  try{
    const { id } = req.params;
    await RolesRepo.deleteRol(id);
    res.json({ok: "Se elimino el registro."});
  } catch (error) {
    res.json({error: "Ocurrio un error al eliminar el registro."});
  }

})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const role = await RolesRepo.getRol(id)
  const rutas = await RutasRepo.getRutas();
  const permissions = await PermissionsRepo.getPermissionsByRole(id);
  const arr = permissions.map(x => {
    return x.ruta_id;
  } )
  res.render('role/edit_modal', {role: role[0], rutas, arr, layout: false});
})

router.post('/edit/:id', async (req, res) => {
  const {description, check} = req.body;
  const { id } = req.params;
  const rol = {description, id};
  await RolesRepo.updateRol(rol);
  await PermissionsRepo.deletePermissionsbyRole(id);
  await PermissionsRepo.addPermissions(id, check);
  req.flash('success', 'Updated Successfully');
  res.redirect('/roles');
})

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const PermissionsRepo = require('../db/permissions.repo')

// router.post('/add', async (req, res) => {
//     try {
//       await PermissionsRepo.addPermission(req.body);
//       req.flash('success', 'Link Saved Successfully');
//       res.redirect('/permission');
//     } catch (ex) {
//       res.status(500).send(ex);
//     }
// })

// router.get('/', async (req, res) => {
//   const permissions = await PermissionsRepo.getPermissions();
//   res.render('permission/index', {permissions});
// })

// router.get('/delete/:id', async (req, res) => {
//   const { id } = req.params;
//   await PermissionsRepo.deletePermission(id);
//   req.flash('success', 'Link Removed Successfully');
//   res.redirect('/permission');

// })

// router.get('/edit/:id', async (req, res) => {
//   const { id } = req.params;
//   const permission = await PermissionsRepo.getPermission(id)
//   res.render('permission/edit_form', {permission: permission[0], layout: false});
// })

// router.post('/edit/:id', async (req, res) => {
//   const {roleId, functionId} = req.body;
//   const { id } = req.params;
//   permission = {roleId, functionId, id};
//   await PermissionsRepo.updatePermission(permission);
//   req.flash('success', 'Link Updated Successfully');
//   res.redirect('/permission');
// })

// module.exports = router;
const express = require('express');
const router = express.Router();
const {checkPermisos} = require('../lib/auth');
const EmpresaRepo = require('../db/empresa.repo')

router.get('/', async (req, res) => {
  const empresa = await EmpresaRepo.getEmpresa();
  res.render('empresa/index', {empresa});
})

// router.post('/add', async (req, res) => {
//     try {
//       await EmpresaRepo.addEmpresa(req.body);
//       req.flash('success', 'Guardado satisfactoriamente');
//     } catch (ex) {
//       res.status(500).send(ex);
//     }
// })

router.post('/edit', async (req, res) => {
  await EmpresaRepo.updateEmpresa(req.body);
  req.flash('success', 'Editado satisfactoriamente');
  res.redirect('/empresa');
})

module.exports = router;
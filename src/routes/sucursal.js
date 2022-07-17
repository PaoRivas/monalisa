const express = require('express');
const router = express.Router();
const SucursalRepo = require('../db/sucursal.repo');

router.post('/add', async (req, res) => {
    try {
      await SucursalRepo.addSucursal(req.body);
      req.flash('success', 'Guardado satisfactoriamente');
      res.redirect('/sucursal');
    } catch (ex) {
      res.status(500).send(ex);
    }
})

router.get('/', async (req, res) => {
  const resultados = await SucursalRepo.getSucursales();
  res.render('sucursal/index', {resultados});
})

router.get('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await SucursalRepo.deleteSucursal(id);
    res.json({ok: "Se elimino el registro."});
  } catch (error) {
    res.json({error: "Ocurrio un error al eliminar el registro."});
  }
})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const resultado = await SucursalRepo.getSucursal(id);
  res.render('sucursal/edit_modal', {resultado, layout: false});
})

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const data = {...req.body, id};
  await SucursalRepo.updateSucursal(data);
  req.flash('success', 'Editado satisfactoriamente');
  res.redirect('/sucursal');
})

module.exports = router;
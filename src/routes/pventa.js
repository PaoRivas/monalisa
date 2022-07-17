const express = require('express');
const router = express.Router();
const PuntoVentaRepo = require('../db/pventa.repo');
const SucursalRepo = require('../db/sucursal.repo')
const operacionesApi = require('../api/operaciones.api');
const EmpresaRepo = require('../db/empresa.repo')

router.post('/add', async (req, res) => {
    try {
      const empresa = await EmpresaRepo.getEmpresa();
      const xmlResult = await operacionesApi.addpventa(req.body, empresa);
      await PuntoVentaRepo.addPuntoVenta(req.body, xmlResult);
      req.flash('success', 'Guardado satisfactoriamente');
      res.redirect('/puntoventa');
    } catch (ex) {
      res.status(500).send(ex);
    }
})

router.get('/', async (req, res) => {
  const resultados = await PuntoVentaRepo.getPuntosVenta();
  const sucursales = await SucursalRepo.getSucursales();
  res.render('pventa/index', {resultados, sucursales});
})

router.get('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await PuntoVentaRepo.deletePuntoVenta(id);
    res.json({ok: "Se elimino el registro."});
  } catch (error) {
    res.json({error: "Ocurrio un error al eliminar el registro."});
  }
})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const resultado = await PuntoVentaRepo.getPuntoVenta(id);
  res.render('pventa/edit_modal', {resultado, layout: false});
})

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const data = {...req.body, id};
  await PuntoVentaRepo.updatePuntoVenta(data);
  req.flash('success', 'Editado satisfactoriamente');
  res.redirect('/pventa');
})

module.exports = router;
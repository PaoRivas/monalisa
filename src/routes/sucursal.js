const express = require('express');
const router = express.Router();
const {checkPermisos} = require('../lib/auth');
const SucursalRepo = require('../db/sucursal.repo');
const CodigosRepo = require('../db/codigos.repo');
const CodigosApi = require('../api/codigos.api');
const EmpresaRepo = require('../db/empresa.repo')

router.get('/', checkPermisos, async (req, res) => {
  const resultados = await SucursalRepo.getSucursalesCUIS();
  res.render('sucursal/index', {resultados});
})

router.post('/add', async (req, res) => {
    try {
      const {codigoSucursal} = req.body;
      const empresa = await EmpresaRepo.getEmpresa();
      const body = {nit:empresa.nit, token:empresa.token, codigoSistema:empresa.codigo, codigoSucursal, codigoAmbiente:2, codigoModalidad:2, codigoPuntoVenta:0};
      const result = await CodigosApi.getcuis(body)
      await CodigosRepo.addCUIS(codigoSucursal, result);
      await SucursalRepo.addSucursal(req.body);
      req.flash('success', 'Guardado satisfactoriamente');
      res.redirect('/sucursales');
    } catch (ex) {
      res.status(500).send(ex);
    }
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
  res.redirect('/sucursales');
})

module.exports = router;
const express = require('express');
const router = express.Router();
const UsersRepo = require('../db/users.repo');
const SincronizacionRepo = require('../db/sincro.repo');
const ProductosRepo = require('../db/productos.repo');
const CodigosRepo = require('../db/codigos.repo');
const EmpresaRepo = require('../db/empresa.repo');
const FacturaRepo = require('../db/factura.repo');
const RolesRepo = require('../db/roles.repo');
const SucursalRepo = require('../db/sucursal.repo');
const CodigosApi = require('../api/codigos.api');
const RecepcionApi = require('../api/recepcion.api');

router.get('/', async (req, res) => {
  const resultados = await FacturaRepo.getFacturas();
  res.render('factura/index', {resultados});
})

router.get('/recepcion', async (req, res) => {
  const users = await UsersRepo.getUsersbyRazon();
  res.render('factura/clients', {users});
})

router.get('/datos', async (req, res) => {
  const users = await UsersRepo.getUsersbyRazon();
  const activities = await SincronizacionRepo.getActividades();
  res.json({users, activities});
})

router.get('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const products = await ProductosRepo.getProductsbyActivity(id);
  res.json({products});
})

router.post('/add', async (req, res) => {
    try {
      const {sucursal_id, id} = req.user;
      const data = {...req.body, sucursal_id, usuario: id}
      const xmlResult = await RecepcionApi.addfactura(data);
      await FacturaRepo.addFactura(data, xmlResult);
      await FacturaRepo.addDetalle(data, xmlResult);
      await FacturaRepo.addRecepcion(xmlResult);
      res.redirect('/facturas');
    } catch (ex) {
      res.status(500).send(ex);
    }
})

// router.get('/delete/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     await PuntoVentaRepo.deletePuntoVenta(id);
//     res.json({ok: "Se elimino el registro."});
//   } catch (error) {
//     res.json({error: "Ocurrio un error al eliminar el registro."});
//   }
// })

router.get('/anular/:id', async (req, res) => {
  const { id } = req.params;
  const resultado = await FacturaRepo.getFactura(id);
  const motivos = await SincronizacionRepo.getMotivosAnulacion();
  res.render('factura/anular_modal', {resultado, motivos, layout: false});
})

router.post('/anular/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {cuf} = await FacturaRepo.getFactura(id);
    const {sucursal_id} = req.user;
    const {codigoMotivo} = req.body;
    const data = {codigoMotivo, cuf, sucursal_id};
    const xmlresult = await RecepcionApi.anularfactura(data);
    await FacturaRepo.addAnulacion(xmlresult);
    res.json({ok: "Se anulo la factura."});
  } catch (error) {
    res.json({error: "Ocurrio un error al anular la factura."});
  }
})

module.exports = router;
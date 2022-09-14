const express = require('express');
const router = express.Router();
const UsersRepo = require('../db/users.repo');
const ProductosRepo = require('../db/productos.repo');
// const SucursalRepo = require('../db/sucursal.repo')
// const operacionesApi = require('../api/operaciones.api');
//const EmpresaRepo = require('../db/empresa.repo')

router.get('/', async (req, res) => {
  const users = await UsersRepo.getUsersbyRazon();
  const products = await ProductosRepo.getProducts();
  res.render('factura/recepcion', {users, products});
})

router.post('/add', async (req, res) => {
    try {
      console.log(req.body);
      // const empresa = await EmpresaRepo.getEmpresa();
      // const xmlResult = await operacionesApi.addpventa(req.body, empresa);
      // await PuntoVentaRepo.addPuntoVenta(req.body, xmlResult);
      // req.flash('success', 'Guardado satisfactoriamente');
      // res.redirect('/puntoventa');
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

// router.get('/edit/:id', async (req, res) => {
//   const { id } = req.params;
//   const resultado = await PuntoVentaRepo.getPuntoVenta(id);
//   res.render('pventa/edit_modal', {resultado, layout: false});
// })

// router.post('/edit/:id', async (req, res) => {
//   const { id } = req.params;
//   const data = {...req.body, id};
//   await PuntoVentaRepo.updatePuntoVenta(data);
//   req.flash('success', 'Editado satisfactoriamente');
//   res.redirect('/pventa');
// })

module.exports = router;
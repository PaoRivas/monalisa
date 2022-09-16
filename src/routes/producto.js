const express = require('express');
const router = express.Router();
const {checkPermisos} = require('../lib/auth');
const ProductosRepo = require('../db/productos.repo');
const SincronizacionRepo = require('../db/sincro.repo');

router.get('/',  async (req, res) => {
  const resultados = await ProductosRepo.getProducts();
  const codigos = await SincronizacionRepo.getProductos();
  res.render('producto/index', {resultados, codigos});
})

router.post('/add', async (req, res) => {
  try {
    await ProductosRepo.addProduct(req.body);
    req.flash('success', 'Guardado satisfactoriamente');
    res.redirect('/productos');
  } catch (ex) {
    res.status(500).send(ex);
  }
})

router.get('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ProductosRepo.deleteProduct(id);
    res.json({ok: "Se elimino el registro."});
  } catch (error) {
    res.json({error: "Ocurrio un error al eliminar el registro."});
  }
})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const resultado = await ProductosRepo.getProduct(id);
  res.render('producto/edit_modal', {resultado, layout: false});
})

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const data = {...req.body, id};
  await ProductosRepo.updateProduct(data);
  req.flash('success', 'Editado satisfactoriamente');
  res.redirect('/productos');
})

router.post('/getproducts', async (req, res) => {
  //console.log(req.body);
  const productos = await ProductosRepo.getProductsIN(req.body.id);
  console.log(productos)
  res.json({productos});
  // req.flash('success', 'Editado satisfactoriamente');
  // res.redirect('/productos');
})

module.exports = router;
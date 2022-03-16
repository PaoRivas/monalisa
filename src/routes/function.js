// const express = require('express');
// const router = express.Router();
// const FunctionsRepo = require('../db/functions.repo')

// router.post('/add', async (req, res) => {
//     try {
//       await FunctionsRepo.addFunction(req.body);
//       req.flash('success', 'Link Saved Successfully');
//       res.redirect('/function');
//     } catch (ex) {
//       res.status(500).send(ex);
//     }
// })

// router.get('/', async (req, res) => {
//   const funcions = await FunctionsRepo.getFunctions();
//   res.render('function/index', {funcions});
// })

// router.get('/delete/:id', async (req, res) => {
//   const { id } = req.params;
//   await FunctionsRepo.deleteFunction(id);
//   req.flash('success', 'Link Removed Successfully');
//   res.redirect('/function');

// })

// router.get('/edit/:id', async (req, res) => {
//   const { id } = req.params;
//   const funcion = await FunctionsRepo.getFunction(id)
//   res.render('function/edit_form', {funcion: funcion[0], layout: false});
// })

// router.post('/edit/:id', async (req, res) => {
//   const {path} = req.body;
//   const { id } = req.params;
//   funcion = {path, id};
//   await FunctionsRepo.updateFunction(funcion);
//   req.flash('success', 'Link Updated Successfully');
//   res.redirect('/function');
// })

// module.exports = router;
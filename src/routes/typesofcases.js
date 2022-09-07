const time = require('../lib/time');
const express = require('express');
const router = express.Router();
const {checkPermisos} = require('../lib/auth');
const TypesofCasesRepo = require('../db/typesofcases.repo');

router.get('/', checkPermisos, async (req, res) => {
  const types = await TypesofCasesRepo.getTypes();
  res.render('typesofcases/index', {types, time});
})

router.post('/add', async (req, res) => {
    try {
      await TypesofCasesRepo.addType(req.body);
      req.flash('success', 'Saved Successfully');
      res.redirect('/types');
    } catch (ex) {
      res.status(500).send(ex);
    }
})

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await TypesofCasesRepo.deleteType(id);
  req.flash('success', 'Removed Successfully');
  res.redirect('/tipos');

})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const type = await TypesofCasesRepo.getType(id);
  res.render('typesofcases/edit_modal', {type: type[0], layout: false});
})

router.post('/edit/:id', async (req, res) => {
  const {name} = req.body;
  const { id } = req.params;
  const type = {name, id};
  await TypesofCasesRepo.updateType(type);
  req.flash('success', 'Updated Successfully');
  res.redirect('/tipos');
})

module.exports = router;
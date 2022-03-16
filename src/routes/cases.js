const time = require('../lib/time');
const express = require('express');
const router = express.Router();
const CasesRepo = require('../db/cases.repo');
const TypesofCasesRepo = require('../db/typesofcases.repo')
const UsersRepo = require('../db/users.repo')

router.get('/add', async (req, res) => {
  const types = await TypesofCasesRepo.getTypes();
  const users = await UsersRepo.getUsers();
  res.render('cases/add_form', {types, users, layout: false});
})

router.post('/add', async (req, res) => {
    try {
      await CasesRepo.addCase(req.body)
      req.flash('success', 'Saved Successfully');
      res.redirect('/cases');
    } catch (ex) {
      res.status(500).send(ex);
    }
})

router.get('/', async (req, res) => {
  const cases = await CasesRepo.getCases();
  res.render('cases/index', {cases, time});
})

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await CasesRepo.deleteCase(id);
  req.flash('success', 'Removed Successfully');
  res.redirect('/cases');

})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const caso = await CasesRepo.getCase(id);
  const types = await TypesofCasesRepo.getTypes();
  const users = await UsersRepo.getUsers();
  res.render('cases/edit_form', {caso: caso[0], types, users, layout: false});
})

router.post('/edit/:id', async (req, res) => {
  const {type, user, subject, description} = req.body;
  const { id } = req.params;
  const caso = {type, user, subject, description, id};
  await CasesRepo.updateCase(caso);
  req.flash('success', 'Updated Successfully');
  res.redirect('/cases');
})

module.exports = router;
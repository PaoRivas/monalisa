const time = require('../lib/time');
const path = require('path');
const express = require('express');
const router = express.Router();
const CasesRepo = require('../db/cases.repo');
const TypesofCasesRepo = require('../db/typesofcases.repo');
const UsersRepo = require('../db/users.repo');
const ActivitiesRepo = require('../db/activities.repo');
const StatesRepo = require('../db/states.repo');

router.get('/add', async (req, res) => {
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
  const cases = await CasesRepo.getAllCases();
  const types = await TypesofCasesRepo.getTypes();
  const users = await UsersRepo.getUsers();
  res.render('cases/index', {cases, types, users, time});
})

router.get('/case/:id', async (req, res) => {
  const { id } = req.params;
  const caso = await CasesRepo.getCase(id);
  const activities = await ActivitiesRepo.getActivities();
  const cases = await CasesRepo.getCases();
  const users = await UsersRepo.getUsers();
  const states = await StatesRepo.getStates();
  res.render('cases/individual_case', {caso:caso[0], activities, cases, users, states});
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
  res.render('cases/edit_modal', {caso: caso[0], types, users, layout: false});
})

router.post('/edit/:id', async (req, res) => {
  const {type, user, subject, description} = req.body;
  const { id } = req.params;
  const caso = {type, user, subject, description, id};
  await CasesRepo.updateCase(caso);
  req.flash('success', 'Updated Successfully');
  res.redirect('/cases');
})

router.post('/upload/:id', async (req, res) => {
  const { id } = req.params;
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.formFile;
  const name = sampleFile.name;
  uploadPath = path.join(__dirname, '../public/files/', name);
  const file = {id, name};
  
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    //res.send('File uploaded!');
  });

  await CasesRepo.addFile(file);
  res.redirect('/cases');
})

module.exports = router;
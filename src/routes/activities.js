const time = require('../lib/time');
const express = require('express');
const router = express.Router();
const ActivitiesRepo = require('../db/activities.repo');

router.post('/add/:caseid', async (req, res) => {
    try {
      const { caseid } = req.params;
      const {activity, nextDate, nextStep} = req.body;
      const { id } = req.user;
      const actividad = {activity, nextDate, nextStep, id, caseid};
      await ActivitiesRepo.addActivity(actividad);
      req.flash('success', 'Saved Successfully');
      res.redirect(`/cases/case/${caseid}`);
    } catch (ex) {
      res.status(500).send(ex);
    }
})

// router.get('/', async (req, res) => {
//   const activities = await ActivitiesRepo.getActivities();
//   const cases = await CasesRepo.getCases();
//   const users = await UsersRepo.getUsers();
//   const states = await StatesRepo.getStates();
//   res.render('activities/index', {activities, cases, users, states});
// })

router.get('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ActivitiesRepo.deleteActivity(id);
    res.json({ok: "Se elimino el registro."});
  } catch (error) {
    res.json({error: "Ocurrio un error al eliminar el registro."});
  }
})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const activity = await ActivitiesRepo.getActivity(id);
  const roles = await RolesRepo.getRoles();
  res.render('activities/edit_modal', {activity: activity[0], roles, layout: false});
})

router.post('/edit/:id', async (req, res) => {
  const {case_id, user_id, estado_id, activity, nextDate, nextStep} = req.body;
  const { id } = req.params;
  const actividad = {case_id, user_id, estado_id, activity, nextDate, nextStep, id};
  await ActivitiesRepo.updateActivity(actividad);
  req.flash('success', 'Updated Successfully');
  res.redirect('/activities');
})

module.exports = router;
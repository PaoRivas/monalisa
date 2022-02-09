const time = require('../lib/time')
const express = require('express');
const router = express.Router();
const LinksRepo = require('../db/links.repo')

router.get('/add', async (req, res) => {
    res.render('links/add');
})

router.post('/add', async (req, res) => {
    try {
      await LinksRepo.addLink(req.body)
      req.flash('success', 'Link Saved Successfully');
      res.redirect('/links');
    } catch (ex) {
      res.status(500).send(ex);
    }
})

router.get('/', async (req, res) => {
  const users = await LinksRepo.getLinks()
  res.render('links/list', {users, time});
})

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await LinksRepo.deleteLink(id);
  req.flash('success', 'Link Removed Successfully');
  res.redirect('/links');
})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const user = await LinksRepo.getLink(id)
  res.render('links/edit', {user: user[0]});
})

router.post('/edit/:id', async (req, res) => {
  const {business_name, bd_name} = req.body;
  const { id } = req.params;
  link = {business_name, bd_name, id};
  await LinksRepo.updateLink(link);
  req.flash('success', 'Link Updated Successfully');
  res.redirect('/links');
})

module.exports = router;
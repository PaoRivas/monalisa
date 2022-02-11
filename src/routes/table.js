const express = require('express');
const router = express.Router();
const UsersRepo = require('../db/users.repo')

const {isLoggedIn} = require('../lib/auth')

router.get('/table', isLoggedIn, async (req, res) => {
    const users = await UsersRepo.getUsers()
    res.render('table', {users});
})

module.exports = router;
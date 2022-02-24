const express = require('express');
const time = require('../lib/time')
const router = express.Router();
const UsersRepo = require('../db/users.repo')

const {isLoggedIn} = require('../lib/auth')

router.get('/list', isLoggedIn, async (req, res) => {
    const users = await UsersRepo.getUsers()
    res.render('user/list', {users, time});
})

module.exports = router;
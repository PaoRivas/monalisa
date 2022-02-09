const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

router.use(require('./authentication'));
router.use('/links', require('./links'));


module.exports = router;
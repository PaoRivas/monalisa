const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

router.use(require('./authentication'));
router.use('/user', require('./user'));
router.use('/role', require('./role'));
// router.use('/function', require('./function'));
// router.use('/permission', require('./permission'));
router.use('/types', require('./typesofcases'));
router.use('/cases', require('./cases'));
router.use('/activities', require('./activities'));
router.use('/sucursal', require('./sucursal'));
router.use('/puntoventa', require('./pventa'))

module.exports = router;
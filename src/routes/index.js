const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

router.use(require('./authentication'));
router.use('/usuarios', require('./user'));
router.use('/roles', require('./role'));
router.use('/tipos', require('./typesofcases'));
router.use('/casos', require('./cases'));
router.use('/activities', require('./activities'));
router.use('/sucursales', require('./sucursal'));
router.use('/facturas', require('./factura'));
router.use('/productos', require('./producto'));
router.use('/empresa', require('./empresa'));

module.exports = router;
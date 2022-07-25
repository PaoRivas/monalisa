const { getConnection, mssql } = require('../database');

const isLoggedIn = (req, res, next) => {
    const nonSecurePaths = ['/signup', '/signin', '/logout', '/favicon.ico'];
    if (req.isAuthenticated() || nonSecurePaths.includes(req.path)) {
        return next();
    }
    return res.redirect('/signin');
}

const checkPermisos = async (req, res, next) => {
    const arrayPaths = req.originalUrl.split("/");
    const pool = await getConnection();
    const request = await pool.request();
    // const rutas = await request.query(`SELECT controlador, accion FROM permisos p inner join rutas r on p.ruta_id = r.id`);
    // const controlledRoute = rutas.some(r => {
    //     r.controlador === arrayPaths[0] && r.accion === arrayPaths[1];
    // })
    // if(!controlledRoute){
    //     return next();
    // }
    const role = req.user.rol_id;
    request.input('role', mssql.Int, role);
    const permisos = await request.query(`SELECT controlador, accion FROM permisos p inner join rutas r on p.ruta_id = r.id where rol_id = @role`);
    // const rutas = permisos.map(x => {
    //     return '/' + x.controlador + '/' + x.accion;
    // })
    const exist = permisos.recordset.some(p => {
        const ctr = arrayPaths[1];
        const accion = arrayPaths[2]
        return p.controlador === ctr && p.accion == accion;
    })
    if (exist) {
        return next();
    }
    return res.redirect('/');
}



module.exports = {
    isLoggedIn,
    checkPermisos,
};
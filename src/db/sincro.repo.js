const { getConnection, mssql } = require('../database');

class SincronizacionRepo {

  static async getProductos() {
    try {
      const pool = await getConnection();
      const result = await pool.request().query('SELECT * FROM sinc_productos');
      return result.recordsets;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }
}

module.exports = SincronizacionRepo
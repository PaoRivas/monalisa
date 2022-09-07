const { getConnection, mssql } = require('../database');

class EmpresaRepo {

  static async getEmpresas() {
    try {
      const pool = await getConnection();
      const result = await pool.request().query('SELECT * FROM empresa');
      return result.recordset[0];
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }
}

module.exports = EmpresaRepo
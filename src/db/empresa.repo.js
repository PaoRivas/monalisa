const { getConnection, mssql } = require('../database');

class EmpresaRepo {

  static async getEmpresa() {
    try {
      const pool = await getConnection();
      const result = await pool.request().query('SELECT r_social, nit, codigo as codigoSistema, token FROM empresa');
      return result.recordset[0];
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }
}

module.exports = EmpresaRepo
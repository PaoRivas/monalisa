const { getConnection, mssql } = require('../database');

class StatesRepo {

  static async getStates() {
    try {
      const pool = await getConnection();
      const paths = await pool.request().query('SELECT * FROM estados');
      return paths.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }
}

module.exports = StatesRepo;
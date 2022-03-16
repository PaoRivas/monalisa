const { getConnection, mssql } = require('../database');
const helpers = require('../lib/helpers')

class TypesofCasesRepo {

  static async getTypes() {
    try {
      const pool = await getConnection();
      const types = await pool.request().query('SELECT * FROM tipo_casos');
      return types.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getType(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      const type = await request.query('SELECT * FROM tipo_casos WHERE id = @id');
      return type.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addType(type) {
    try {
      const {name} = type;
      const pool = await getConnection();
      const request = await pool.request();
      request.input('type', mssql.VarChar(50), name);
      const result = await request.query(
        `INSERT INTO [dbo].[tipo_casos]
        ([tipo])
        VALUES
        (@type)`
      );
      return result.recordsets;
    }
    catch (error) {
      console.log(error);
      throw (error);
    }
  }

  
  static async deleteType(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      await request.query('DELETE FROM tipo_casos WHERE id = @id');

    } catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async updateType(type) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, type.id);
      request.input('type', mssql.VarChar(50), type.name);
      await request.query(
        `UPDATE tipo_casos SET 
        tipo = @type
        WHERE id = @id`
      );
    } catch (error) {
      console.log(error);
      throw(error);
    }    
  }
}

module.exports = TypesofCasesRepo
const { getConnection, mssql } = require('../database');

class FunctionsRepo {

  static async getFunctions() {
    try {
      const pool = await getConnection();
      const paths = await pool.request().query('SELECT * FROM funciones');
      return paths.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  // static async getFunction(id) {
  //   try {
  //     const pool = await getConnection();
  //     const request = await pool.request();
  //     request.input('id', mssql.Int, id);
  //     const funcion = await request.query('SELECT * FROM funciones WHERE id = @id');
  //     return funcion.recordset;
  //   }
  //   catch (error) {
  //     console.log(error);
  //     throw(error);
  //   }
  // }

  // static async addFunction(funcion) {
  //   try {
  //     const {path} = funcion;
  //     const pool = await getConnection();
  //     const request = await pool.request();
  //     request.input('path', mssql.VarChar(50), path);
  //     const result = await request.query(
  //       `INSERT INTO funciones
  //       (path)
  //       VALUES
  //       (@path)`
  //     );
  //     return result.recordsets;
  //   }
  //   catch (error) {
  //     console.log(error);
  //     throw (error);
  //   }
  // }

  
  // static async deleteFunction(id) {
  //   try {
  //     const pool = await getConnection();
  //     const request = await pool.request();
  //     request.input('id', mssql.Int, id);
  //     await request.query('DELETE FROM funciones WHERE id = @id');

  //   } catch (error) {
  //     console.log(error);
  //     throw(error);
  //   }
  // }

  // static async updateFunction(funcion) {
  //   try {
  //     const pool = await getConnection();
  //     const request = await pool.request();
  //     request.input('id', mssql.Int, funcion.id);
  //     request.input('path', mssql.VarChar(50), funcion.path);
  //     await request.query(
  //       `UPDATE usuarios SET 
  //       path = @path
  //       WHERE id = @id`
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     throw(error);
  //   }    
  // }
}

module.exports = FunctionsRepo
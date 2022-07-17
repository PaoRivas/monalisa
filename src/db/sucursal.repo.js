const { getConnection, mssql } = require('../database');

class SucursalRepo {

  static async getSucursales() {
    try {
      const pool = await getConnection();
      const result = await pool.request().query('SELECT * FROM sucursal');
      return result.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getSucursal(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      const result = await request.query('SELECT * FROM sucursal WHERE id = @id');
      return result.recordset[0];
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addSucursal(sucursal) {
    try {
      const {nombre, descripcion} = sucursal; 
      const pool = await getConnection();
      const request = await pool.request();
      request.input('nombre', mssql.VarChar(50), nombre);
      request.input('descripcion', mssql.VarChar(100), descripcion);
      request.input('creado',  mssql.DateTime, new Date());
      await request.query(
        `INSERT INTO [dbo].[sucursal] (nombre, descripcion, creado) 
        VALUES (@nombre, @descripcion, @creado)`
      );
    }
    catch (error) {
      console.log(error);
      throw (error);
    }
  }

  
  static async deleteSucursal(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      await request.query('DELETE FROM sucursal WHERE id = @id');
    } 
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async updateSucursal(sucursal) {
    try {
      const {id, nombre, descripcion} = sucursal;
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      request.input('nombre', mssql.VarChar(50), nombre);
      request.input('descripcion', mssql.VarChar(100), descripcion);
      await request.query(
        `UPDATE sucursal SET 
        nombre = @nombre, descripcion = @descripcion
        WHERE id = @id`
      );
    } 
    catch (error) {
      console.log(error);
      throw(error);
    }    
  }
}

module.exports = SucursalRepo
const { getConnection, mssql } = require('../database');

class SucursalRepo {

  static async getSucursalesCUIS() {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(
        `SELECT s.id, numero, nombre, municipio, telefono, creado, codigo, vigencia 
        FROM sucursal s inner join cuis c on s.numero = c.numero_sucursal where c.vigencia > GETDATE()`);
      return result.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getSucursales() {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      const result = await request.query('SELECT * FROM sucursal');
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
      const {codigoSucursal, nombre, municipio, telefono} = sucursal; 
      const pool = await getConnection();
      const request = await pool.request();
      request.input('numero', mssql.Int, codigoSucursal);
      request.input('nombre', mssql.VarChar(50), nombre);
      request.input('municipio', mssql.VarChar(30), municipio);
      request.input('telefono',  mssql.VarChar(20), telefono);
      request.input('creado',  mssql.DateTime, new Date());
      await request.query(
        `INSERT INTO [dbo].[sucursal] (numero, nombre, municipio, telefono, creado) 
        VALUES (@numero, @nombre, @municipio, @telefono, @creado)`
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
      const {id, numero, nombre, municipio, telefono} = sucursal;
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      request.input('numero', mssql.Int, numero);
      request.input('nombre', mssql.VarChar(50), nombre);
      request.input('municipio', mssql.VarChar(30), municipio);
      request.input('telefono',  mssql.VarChar(20), telefono);
      await request.query(
        `UPDATE sucursal SET 
        numero = @numero, nombre = @nombre, municipio = @municipio, telefono = @telefono
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
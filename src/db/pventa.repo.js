const { getConnection, mssql } = require('../database');

class PuntoVentaRepo {

  static async getPuntosVenta() {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      const result = await request.query('SELECT * FROM pventa');
      return result.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getPuntoVenta(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      const result = await request.query('SELECT * FROM pventa WHERE id = @id');
      return result.recordset[0];
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addPuntoVenta(form, xmlresponse) {
    try {
        const {codigoSucursal, codigoTipoPuntoVenta, descripcion, nombrePuntoVenta} = form;
        const {codigoPuntoVenta} = xmlresponse;
        const pool = await getConnection();
        const request = await pool.request();
        request.input('sucursal',  mssql.Int, codigoSucursal);
        request.input('tipo',  mssql.Int, codigoTipoPuntoVenta);
        request.input('descripcion',  mssql.VarChar(100), descripcion);
        request.input('nombre',  mssql.VarChar(50), nombrePuntoVenta);
        request.input('codigo',  mssql.Int, codigoPuntoVenta);
        request.input('creado',  mssql.DateTime, new Date());
        await request.query(
          `INSERT INTO [dbo].[pventa]
          ([sucursal_id],[tipo_pventa],[descripcion],[nombre_pventa],[codigo],[creado])
          VALUES (@sucursal, @tipo, @descripcion, @nombre, @codigo, @creado)`
        )
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async deletePuntoVenta(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      await request.query('DELETE FROM pventa WHERE id = @id');
    } 
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async updatePuntoVenta(form) {
    try {
      const {descripcion} = form;
      const pool = await getConnection();
      const request = await pool.request();
      request.input('descripcion',  mssql.VarChar(100), descripcion);
      await request.query(
        `UPDATE pventa SET descripcion = @descripcion
        WHERE id = @id`
      );
    } 
    catch (error) {
      console.log(error);
      throw(error);
    }    
  }
}

module.exports = PuntoVentaRepo;
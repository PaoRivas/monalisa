const { getConnection, mssql } = require('../database');

class SincronizacionRepo {

  static async getTiposDocumento() {
    try {
      const pool = await getConnection();
      const result = await pool.request().query('SELECT * FROM sinc_tipo_documento_identidad');
      return result.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getProductos() {
    try {
      const pool = await getConnection();
      const result = await pool.request().query('SELECT * FROM sinc_lista_productos');
      return result.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getActividades() {
    try {
      const pool = await getConnection();
      const result = await pool.request().query('SELECT * FROM sinc_actividades');
      return result.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getMotivosAnulacion() {
    try {
      const pool = await getConnection();
      const result = await pool.request().query('SELECT * FROM sinc_motivo_anulacion');
      return result.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }
}

module.exports = SincronizacionRepo
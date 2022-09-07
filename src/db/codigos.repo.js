const { getConnection, mssql } = require('../database');

class CodigosRepo {

  static async getCUISbySucursal(sucursal) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('sucursal', mssql.Int, sucursal);
      const result = await request.query('SELECT * FROM cuis WHERE vigencia > GETDATE() AND sucursal_id = @sucursal');
      return result.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addCUIS(codigoSucursal, xmlresponse) {
    try {
      const {codigo, fechaVigencia} = xmlresponse;
      const pool = await getConnection();
      const request = await pool.request();
      request.input('sucursal',  mssql.Int, codigoSucursal);
      request.input('codigo',  mssql.VarChar(10), codigo);
      request.input('vigencia', mssql.DateTime, fechaVigencia);
      await request.query(
        `INSERT INTO [dbo].[cuis] ([numero_sucursal],[codigo],[vigencia])
        VALUES (@sucursal, @codigo, @vigencia)`
      );
    }
      catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getCUFDbyCUIS(cuis) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('cuis',  mssql.Int, cuis);
      const response = await request.query(`SELECT codigo, codigo_control FROM cufd WHERE vigencia > GETDATE() AND cuis = @cuis`);
      var lastcufd = response.recordset[0];
      if (!lastcufd){
        lastcufd = {codigo: 'No existe CUFD vigente'};
      }
      return lastcufd;
    }
      catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addCUFD(form, xmlresponse) {
    try {
      const {cuis} = form;
      const {codigo, codigoControl, direccion, fechaVigencia} = xmlresponse;
      const pool = await getConnection();
      const request = await pool.request();
      request.input('cuis',  mssql.VarChar(10), cuis);
      request.input('codigo',  mssql.VarChar(100), codigo);
      request.input('ccontrol',  mssql.VarChar(50), codigoControl);
      request.input('direccion',  mssql.VarChar(200), direccion);
      request.input('vigencia', mssql.DateTime, fechaVigencia);
      await request.query(
        `INSERT INTO [dbo].[cufd] ([cuis],[codigo],[codigo_control],[direccion],[vigencia])
        VALUES (@cuis, @codigo, @ccontrol, @direccion, @vigencia)`
      );
    }
      catch (error) {
      console.log(error);
      throw(error);
    }
  }
}

module.exports = CodigosRepo;
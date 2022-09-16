const { getConnection, mssql } = require('../database');

class CodigosRepo {

  static async getCUISbySucursal(sucursal) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('sucursal', mssql.Int, sucursal);
      const result = await request.query(`SELECT numero, codigo FROM sucursal s 
                                          inner join cuis a ON a.numero_sucursal = s.numero
                                          WHERE a.vigencia > GETDATE() AND s.id = @sucursal`);
      return result.recordset[0];
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

  static async getCUFDbySucursal(sucursal) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('sucursal',  mssql.Int, sucursal);
      const response = await request.query(`SELECT municipio, telefono, a.codigo, b.codigo, b.codigo_control, b.direccion FROM sucursal s 
                                            inner join cuis a ON a.numero_sucursal = s.numero
                                            inner join cufd b ON b.cuis = a.codigo
                                            WHERE a.vigencia > GETDATE() AND b.vigencia > GETDATE() AND s.id = @sucursal`);
      var lastcufd = response.recordset[0];
      // if (!lastcufd){
      //   lastcufd = {codigo: 'No existe CUFD vigente'};
      // }
      return lastcufd;
    }
      catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addCUFD(cuis, xmlresponse) {
    try {
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
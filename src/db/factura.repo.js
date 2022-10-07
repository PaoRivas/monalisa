const { getConnection, mssql } = require('../database');

class FacturaRepo {

  static async getFacturas() {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(
        `SELECT f.id, numero, fecha_emision, monto_total, usuario, razon_social, numero_documento, t.descripcion, a.id as anulado FROM factura f
        INNER JOIN usuarios u ON u.id = f.usuario
        INNER JOIN sinc_tipo_documento_identidad t on t.codigo_clasificador = u.tipo_documento_id
        LEFT JOIN anulacion a on a.cuf = f.cuf
        WHERE fecha_emision > GETDATE() - DAY(GETDATE())`);
      return result.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getFactura(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      const result = await request.query(
        `SELECT * FROM factura WHERE id = @id`);
      return result.recordset[0];
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getFacturasbyUser(user) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('usuario', mssql.Int, user);
      const result = await request.query(
        `SELECT f.id, numero, fecha_emision, monto_total, usuario, razon_social, numero_documento, tipo_documento_id FROM factura f
        INNER JOIN usuarios u ON u.id = f.usuario WHERE usuario = @usuario`);
      return result.recordset[0];
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getNumeroFactura() {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(
        'SELECT isnull(max(numero)+1, 1) as numFactura FROM factura');
      return result.recordset[0];
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addFactura(datos, apiresult) {
    try {
      const {cliente, total, usuario} = datos; 
      const {numFactura, cuf, cufd, fechaEnvio} = apiresult;
      const pool = await getConnection();
      const request = await pool.request();
      request.input('numero', mssql.Int, numFactura);
      request.input('cuf', mssql.VarChar(100), cuf);
      request.input('cufd', mssql.VarChar(100), cufd);
      request.input('fecha',  mssql.DateTime, fechaEnvio);
      request.input('cliente',  mssql.Int, cliente);
      request.input('total',  mssql.Int, total);
      request.input('usuario', mssql.Int, usuario);
      await request.query(
        `INSERT INTO [dbo].[factura] ([numero],[cuf],[cufd],[fecha_emision],[cliente_id],[monto_total],[usuario])
         VALUES (@numero, @cuf, @cufd, @fecha, @cliente, @total, @usuario)`
      );
    }
    catch (error) {
      console.log(error);
      throw (error);
    }
  }

  static async addDetalle(datos, apiresult) {
    try {
      const {productsid} = datos; 
      const {numFactura} = apiresult;
      const pool = await getConnection();
      const request = await pool.request();
      request.input('numero', mssql.Int, numFactura);
      const productos = [].concat(productsid);
      productos.forEach(async (res, i) => {
        request.input(`producto${i}`, mssql.Int, res);
        await request.query(
          `INSERT INTO [dbo].[detalle] ([numero_factura],[producto_id],[cantidad]) 
            VALUES (@numero, @producto${i}, 1)`
        );
      });
    }
    catch (error) {
      console.log(error);
      throw (error);
    }
  }

  static async addRecepcion(apiresult) {
    try {
      const {numFactura, codigoDocumentoSector, codigoEmision, tipoFacturaDocumento, fechaEnvio, archivo, hashArchivo, codigoRecepcion} = apiresult; 
      const pool = await getConnection();
      const request = await pool.request();
      request.input('numero', mssql.Int, numFactura);
      request.input('sector', mssql.Int, codigoDocumentoSector);
      request.input('emision', mssql.Int, codigoEmision);
      request.input('tipofactura', mssql.Int, tipoFacturaDocumento);
      request.input('fecha',  mssql.DateTime, fechaEnvio);
      request.input('archivo', mssql.Text, archivo);
      request.input('hash', mssql.VarChar(200), hashArchivo);
      request.input('recepcion', mssql.VarChar(80), codigoRecepcion);
      await request.query(
        `INSERT INTO [dbo].[recepcion_factura]([numero_factura],[documento_sector],[emision],
        [tipo_factura],[fecha_envio],[archivo],[hash],[codigo_recepcion])
        VALUES (@numero, @sector, @emision, @tipofactura, @fecha, @archivo, @hash, @recepcion)`
      );
    }
    catch (error) {
      console.log(error);
      throw (error);
    }
  }

  static async addAnulacion(xmlresponse) {
    try {
        const {cufd, codigoDocumentoSector, codigoEmision, tipoFacturaDocumento, codigoMotivo, cuf, codigoDescripcion, codigoEstado} = xmlresponse;
        const pool = await getConnection();
        const request = await pool.request();
        request.input('cufd',  mssql.VarChar(100), cufd);
        request.input('sector',  mssql.Int, codigoDocumentoSector);
        request.input('emision',  mssql.Int, codigoEmision);
        request.input('tipo',  mssql.Int, tipoFacturaDocumento);
        request.input('motivo',  mssql.Int, codigoMotivo);
        request.input('cuf',  mssql.VarChar(100), cuf);
        request.input('descripcion',  mssql.VarChar(20), codigoDescripcion);
        request.input('estado',  mssql.Int, codigoEstado);
        request.input('creado',  mssql.DateTime, new Date());
        await request.query(
          `INSERT INTO [dbo].[anulacion]
          ([cufd],[documento_sector],[emision],[tipo_factura],[codigo_motivo],[cuf],
            [descripcion],[codigo_estado],[creado])
    VALUES
          (@cufd, @sector, @emision, @tipo, @motivo, @cuf,
            @descripcion, @estado, @creado)`
        )
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

}

module.exports = FacturaRepo
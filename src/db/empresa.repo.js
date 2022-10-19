const { getConnection, mssql } = require('../database');

class EmpresaRepo {

  static async getEmpresa() {
    try {
      const pool = await getConnection();
      const result = await pool.request().query('SELECT r_social, nit, codigo as codigoSistema, token FROM empresa');
      return result.recordset[0];
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  // static async addEmpresa(empresa) {
  //   try {
  //     const {razonSocial, nit, codigo, token} = empresa; 
  //     const pool = await getConnection();
  //     const request = await pool.request();
  //     request.input('nombre', mssql.Int, razonSocial);
  //     request.input('nit', mssql.VarChar(50), nit);
  //     request.input('codigo', mssql.VarChar(30), codigo);
  //     request.input('token',  mssql.VarChar(20), token);
  //     await request.query(
  //       `INSERT INTO [dbo].[empresa] (r_social, nit, codigo, token) 
  //       VALUES (@nombre, @nit, @codigo, @token)`
  //     );
  //   }
  //   catch (error) {
  //     console.log(error);
  //     throw (error);
  //   }
  // }

  static async updateEmpresa(empresa) {
    try {
      const {razonSocial, nit, codigo, token} = empresa; 
      const pool = await getConnection();
      const request = await pool.request();
      request.input('nombre', mssql.VarChar(50), razonSocial);
      request.input('nit', mssql.VarChar(50), nit);
      request.input('codigo', mssql.VarChar(100), codigo);
      request.input('token',  mssql.Text, token);
      await request.query(
        `UPDATE empresa SET 
        r_social = @nombre, nit = @nit, codigo = @codigo, token = @token`
      );
    } 
    catch (error) {
      console.log(error);
      throw(error);
    }    
  }
}

module.exports = EmpresaRepo
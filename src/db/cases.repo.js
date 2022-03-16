const { getConnection, mssql } = require('../database');
const helpers = require('../lib/helpers')

class CasesRepo {

  static async getCases() {
    try {
      const pool = await getConnection();
      const cases = await pool.request().query('SELECT * FROM casos');
      return cases.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getCase(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      const cases = await request.query('SELECT * FROM casos WHERE id = @id');
      return cases.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addCase(caso) {
    try {
      const {type, user, subject, description} = caso;
      const pool = await getConnection();
      const request = await pool.request();
      request.input('type',  mssql.Int, type);
      request.input('user_id',  mssql.Int, user);
      request.input('subject', mssql.VarChar(50), subject);
      request.input('description', mssql.VarChar(100), description);
      request.input('requestDate', mssql.DateTime, new Date());
      const result = await request.query(
        `INSERT INTO [dbo].[casos]
        ([tipo_caso_id], [usuario_id], [asunto], [descripcion], [creado], [creador], [modificado], [modificador])
        VALUES
        (@type, @user_id ,@subject, @description, @requestDate, 1, @requestDate, 1)`
      );
      return result.recordsets;
    }
    catch (error) {
      console.log(error);
      throw (error);
    }
  }

  
  static async deleteCase(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      await request.query('DELETE FROM casos WHERE id = @id');

    } catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async updateCase(caso) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, caso.id);
      request.input('type',  mssql.Int, caso.type);
      request.input('user_id',  mssql.Int, caso.user);
      request.input('subject', mssql.VarChar(50), caso.subject);
      request.input('description', mssql.VarChar(100), caso.description);
      request.input('created', mssql.DateTime, new Date());
      request.input('modified', mssql.DateTime, new Date());
      await request.query(
        `UPDATE casos SET 
        [tipo_caso_id] = @type,
      [usuario_id] = @user_id,
      [asunto] = @subject, 
      [descripcion] = @description, 
      [creado] = @created, 
      [creador] = 1, 
      [modificado] = @modified, 
      [modificador] = 1
        WHERE id = @id`
      );
    } catch (error) {
      console.log(error);
      throw(error);
    }    
  }
}

module.exports = CasesRepo
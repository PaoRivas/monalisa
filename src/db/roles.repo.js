const { getConnection, mssql } = require('../database');

class RolesRepo {

  static async getRoles() {
    try {
      const pool = await getConnection();
      const roles = await pool.request().query('SELECT * FROM roles');
      return roles.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getRol(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      const role = await request.query('SELECT * FROM roles WHERE id = @id');
      return role.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addRol(rol) {
    try {
      const {description} = rol; 
      const pool = await getConnection();
      const request = await pool.request();
      request.input('description', mssql.VarChar(50), description);
      const result = await request.query(
        `INSERT INTO [dbo].[roles]
        (descripcion)
        OUTPUT inserted.id VALUES
        (@description)`
      );
      return result.recordset[0].id;
    }
    catch (error) {
      console.log(error);
      throw (error);
    }
  }

  
  static async deleteRol(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      await request.query('DELETE FROM roles WHERE id = @id');

    } catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async updateRol(rol) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, rol.id);
      request.input('description', mssql.VarChar(50), rol.description);
      await request.query(
        `UPDATE roles SET 
        descripcion = @description
        WHERE id = @id`
      );
    } catch (error) {
      console.log(error);
      throw(error);
    }    
  }
}

module.exports = RolesRepo
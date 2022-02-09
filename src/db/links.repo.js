const { getConnection, mssql } = require('../database');

class LinksRepo {

  static async getLinks() {
    try {
      const pool = await getConnection();
      const users = await pool.request().query('SELECT * FROM users');
      return users.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getLink(linkId) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('idos', mssql.Int, linkId);
      const user = await request.query('SELECT * FROM users WHERE id = @idos');
      return user.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addLink(link) {
    try {
      const {business_name, bd_name} = link
      const pool = await getConnection();
      const request = await pool.request();
      request.input('firstName', mssql.VarChar(50), business_name);
      request.input('lastName', mssql.VarChar(50), bd_name);
      request.input('requestDate', mssql.DateTime, new Date());
      const result = await request.query(
        `INSERT INTO [dbo].[users]
          (first_name, last_name, created)
          VALUES
          (@firstName, @lastName, @requestDate)`
      );
      return result.recordsets;
    }
    catch (error) {
      console.log(error);
      throw (error);
    }
  }

  
  static async deleteLink() {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('idos', mssql.Int, id);
      await request.query('DELETE FROM users WHERE id = @idos');

    } catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async updateLink(link) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('idos', mssql.Int, link.id);
      request.input('firstName', mssql.VarChar(50), link.business_name);
      request.input('lastName', mssql.VarChar(50), link.bd_name);
      await request.query('UPDATE users SET first_name = @firstName, last_name = @lastName WHERE id = @idos');
    } catch (error) {
      console.log(error);
      throw(error);
    }    
  }
}

module.exports = LinksRepo
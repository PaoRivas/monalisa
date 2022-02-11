const { getConnection, mssql } = require('../database');
const helpers = require('../lib/helpers')

class UsersRepo {

  static async getUsers() {
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

  static async getUser(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('idos', mssql.Int, id);
      const user = await request.query('SELECT * FROM users WHERE id = @idos');
      return user.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addUser(user) {
    try {
      const {fullname, email, cellphone, identity} = user;
      let {password} = user;
      const pool = await getConnection();
      const request = await pool.request();
      password = await helpers.encryptPassword(password);
      request.input('name', mssql.VarChar(50), fullname);
      request.input('email', mssql.VarChar(50), email);
      request.input('password', mssql.VarChar(100), password);
      request.input('cellphone', mssql.VarChar(15), cellphone);
      request.input('identity', mssql.VarChar(15), identity);
      request.input('requestDate', mssql.DateTime, new Date());
      const result = await request.query(
        `INSERT INTO [dbo].[users] 
        (name, email, password, cellphone, identityCard, lastChangePwd, created, modified)  
        VALUES 
        (@name, @email, @password, @cellphone, @identity, @requestDate, @requestDate, @requestDate)`
      );
      return result.recordsets;
    }
    catch (error) {
      console.log(error);
      throw (error);
    }
  }

  
  static async deleteUser(id) {
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

  static async updateUser(user) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('idos', mssql.Int, user.id);
      request.input('name', mssql.VarChar(50), user.fullname);
      request.input('email', mssql.VarChar(50), user.email);
      request.input('cellphone', mssql.VarChar(15), user.cellphone);
      request.input('identity', mssql.VarChar(15), user.identity);
      await request.query(
        `UPDATE users SET 
        name = @name, email = @email, cellphone = @cellphone, identityCard = @identity 
        WHERE id = @idos`
      );
    } catch (error) {
      console.log(error);
      throw(error);
    }    
  }
}

module.exports = UsersRepo
const { getConnection, mssql } = require('../database');

class PermissionsRepo {

  // static async getPermissions() {
  //   try {
  //     const pool = await getConnection();
  //     const permissions = await pool.request().query(`SELECT p.id, r.descripcion, f.path
  //       FROM permisos p
  //       INNER JOIN roles r ON p.rol_id = r.id
  //       INNER JOIN funciones f ON p.funcion_id = f.id`);
  //     return permissions.recordset;
  //   }
  //   catch (error) {
  //     console.log(error);
  //     throw(error);
  //   }
  // }

  static async getPermissionsByRole(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      const permissions = await request.query(`SELECT ruta_id FROM permisos WHERE rol_id = @id`);
      return permissions.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  // static async getPermission(id) {
  //   try {
  //     const pool = await getConnection();
  //     const request = await pool.request();
  //     request.input('id', mssql.Int, id);
  //     const permission = await request.query('SELECT * FROM permisos WHERE id = @id');
  //     return permission.recordset;
  //   }
  //   catch (error) {
  //     console.log(error);
  //     throw(error);
  //   }
  // }

  static async addPermissions(roleId, functions) {
    try {
      //const {roleId, functionId} = permission;
      const pool = await getConnection();
      const request = await pool.request();
      request.input('role_id', mssql.Int, roleId);
      for(let functionId of functions){
        request.input(`function_id${functionId}`, mssql.Int, functionId);
        await request.query(
          `INSERT INTO permisos
          (rol_id, ruta_id)
          VALUES
          (@role_id, @ruta_id${functionId})`
        );
      }
      //return result.recordsets;
    }
    catch (error) {
      console.log(error);
      throw (error);
    }
  }

  
  // static async deletePermission(id) {
  //   try {
  //     const pool = await getConnection();
  //     const request = await pool.request();
  //     request.input('id', mssql.Int, id);
  //     await request.query('DELETE FROM permisos WHERE id = @id');

  //   } catch (error) {
  //     console.log(error);
  //     throw(error);
  //   }
  // }

  static async deletePermissionsbyRole(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      await request.query('DELETE FROM permisos WHERE rol_id = @id');

    } catch (error) {
      console.log(error);
      throw(error);
    }
  }

  // static async updatePermission(permission) {
  //   try {
  //     const pool = await getConnection();
  //     const request = await pool.request();
  //     request.input('id', mssql.Int, permission.id);
  //     request.input('role_id', mssql.Int, permission.roleId);
  //     request.input('function_id', mssql.Int, permission.functionId);
  //     await request.query(
  //       `UPDATE permisos SET 
  //       rol_id = @role_id, funcion_id = @function_id
  //       WHERE id = @id`
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     throw(error);
  //   }    
  // }
}

module.exports = PermissionsRepo
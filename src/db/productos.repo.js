const { getConnection, mssql } = require('../database');
const helpers = require('../lib/helpers')

class ProductosRepo {

  static async getProducts() {
    try {
      const pool = await getConnection();
      const products = await pool.request().query('SELECT * FROM productos');
      return products.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getProduct(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      const product = await request.query('SELECT * FROM productos WHERE id = @id');
      return product.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getProductsIN(ids) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      var select = 'SELECT * FROM productos WHERE id in ('
      ids.forEach((res, i) => {
        request.input(`id${i}`, mssql.Int, res);
        select += `@id${i},`;
      });
      select += '0)';
      const products = await request.query(select);
      //console.log(products.recordset)
      return products.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addProduct(product) {
    try {
      const {codigo, descripcion, precio, catalogo_id} = product;
      const pool = await getConnection();
      const request = await pool.request();
      request.input('codigo',  mssql.Int, codigo);
      request.input('descripcion', mssql.VarChar(100), descripcion);
      request.input('precio', mssql.Int, precio);
      request.input('catalogo_id',  mssql.Int, catalogo_id);
      const result = await request.query(
        `INSERT INTO [dbo].[productos]
        ([codigo],[descripción],[precio],[unidad_id],[catalogo_id])
          VALUES
        (@codigo,@descripcion,@precio,58,@catalogo_id)`
      );
      return result.recordsets;
    }
    catch (error) {
      console.log(error);
      throw (error);
    }
  }

  
  static async deleteProduct(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      await request.query('DELETE FROM productos WHERE id = @id');

    } catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async updateProduct(product) {
    try {
      const {id, codigo, descripcion, precio, catalogo_id} = product;
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      request.input('codigo',  mssql.Int, codigo);
      request.input('descripcion', mssql.VarChar(100), descripcion);
      request.input('precio', mssql.Int, precio);
      request.input('catalogo_id',  mssql.Int, catalogo_id);
      await request.query(
        `UPDATE productos SET 
        codigo = @codigo, descripcion = @descripcion, precio = @precio, catalogo_id = @catalogo_id
        WHERE id = @id`
      );
    } catch (error) {
      console.log(error);
      throw(error);
    }    
  }
}

module.exports = ProductosRepo
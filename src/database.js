const mssql = require('mssql'); 
const { sqlConnectionConfig } = require('./keys');

//const pool = new sql.ConnectionPool(sqlConnectionConfig);

const getConnection = async () => {
  try {
    const pool = await mssql.connect(sqlConnectionConfig);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

//export { sql };

module.exports = {
    mssql,
    getConnection
};
const sql = require('mssql'); 
const { sqlConnectionConfig } = require('./keys');

const pool = new sql.ConnectionPool(sqlConnectionConfig);

// export const getConnection = async () => {
//   try {
//     const pool = await sql.connect(sqlConnectionConfig);
//     return pool;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export { sql };

module.exports = pool;
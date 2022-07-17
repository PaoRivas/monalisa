const { application } = require('express');
const mssql = require('mssql'); 
const {dbSettings, dbSettingsInicio} = require('./keys');

let databaseName = null;
const setDataBaseName = (dbName) => {
  databaseName = dbName;
}

const getDatabaseName = async (nit) => {
  try {
    const pool = await mssql.connect(dbSettingsInicio);
    const request = await pool.request();
    request.input('nit', mssql.VarChar(100), nit);
    const rows = await request.query('SELECT * FROM nombres_db WHERE nit = @nit');
    if (rows.recordset.length > 0){
        const name = rows.recordset[0];       
        return name.name_db
    } else {
      console.error('NIT does not have DB');
    }
  } catch (error) {
    console.error(error);
  } finally {
    mssql.close();
  }
};

const getConnection = async (dbNamea) => {
  try {
    dbSettings.database = dbNamea ?? databaseName;
    const pool = await mssql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

const closeConnection = async () => {
  mssql.close();
}

module.exports = {
    mssql,
    getConnection,
    getDatabaseName,
    closeConnection,
    setDataBaseName,
};
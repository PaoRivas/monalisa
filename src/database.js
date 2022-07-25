const mssql = require('mssql'); 
const {dbSettingsInicio} = require('./keys');
const storage = require('./lib/storage')

const pools = new Map();

const initDB = () => {
  //getPool("monalisa_inicio", dbSettingsInicio);
}

const getDatabaseByNit = async (nit) => {
  try {
    const pool = await getPool("monalisa_inicio", dbSettingsInicio);
    const request = await pool.request();
    request.input('nit', mssql.VarChar(100), nit);
    const rows = await request.query('SELECT * FROM databases WHERE nit = @nit');
    if (rows.recordset.length > 0){
        return rows.recordset[0];
    } else {
      console.error('NIT does not have DB');
    }
  } catch (error) {
    console.error(error);
  }
};

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


 const getPool = async (name, config) => {
  if (!pools.has(name)) {
    if (!config) {
     throw new Error('Pool does not exist');
    }
    const pool = new mssql.ConnectionPool(config);
    // automatically remove the pool from the cache if `pool.close()` is called
    const close = pool.close.bind(pool);
    pool.close = (...args) => {
     pools.delete(name);
     return close(...args);
    }
    //await pool.connect()
    pools.set(name, pool.connect());
   }
   return pools.get(name);
}

const createConnectionConfig = (dbInfo) => {
  return {
    user: dbInfo.db_username,
    password: dbInfo.db_password,
    server: dbInfo.db_host,
    database: dbInfo.db_name,
    port: dbInfo.db_port,
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    }
  };
}

const getConnection = async () => {
    const dbName = storage.getStore();
    const pool = getPool(dbName);

    if (!pool) {
      throw 'Connection is not set for this database.';
    }

    return pool;
};

module.exports = {
    mssql,
    getConnection,
    getDatabaseByNit,
    getPool,
    createConnectionConfig,
    initDB
};
const { config } = require("dotenv");
config();

let env = {
  dbUser: process.env.DB_USER || "",
  dbPassword: process.env.DB_PASSWORD || "",
  dbServer: process.env.DB_SERVER || "",
  dbDatabase: process.env.DB_DATABASE || "",
  dbport: parseInt(process.env.DB_PORT) || 1433
};

const dbSettings = {
  user: env.dbUser,
  password: env.dbPassword,
  server: env.dbServer,
  database: null,
  port: env.dbport,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

const dbSettingsInicio = {
  user: env.dbUser,
  password: env.dbPassword,
  server: env.dbServer,
  database: env.dbDatabase,
  port: env.dbport,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

module.exports = {
  dbSettings,
  dbSettingsInicio
}

// module.exports = {

//     sqlConnectionConfig: {
//         user: 'monalisa',
//         password: 'Monalisa123',
//         server: 'localhost',
//         database: 'links',
//         port: 1434,
//         options: {
//             trustServerCertificate: true
//         }
//     }
// };


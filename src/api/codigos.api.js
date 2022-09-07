const { getClient } = require('../clientsoap');
const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionCodigos?wsdl';
//const helpers = require('../lib/helpers');

const getcuis = async (data) => {
  const {token, ...restData} = data;
  const args = {SolicitudCuis: restData};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client.cuisAsync(args);
  const result = Object.values(response[0])[0];
  return result;
};

const getcufd = async (data) => {
  const {token, ...restData} = data;
  const args = {SolicitudCufd: restData};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client.cufdAsync(args);
  const result = Object.values(response[0])[0];
  return result;
};

module.exports = {
  getcuis,
  getcufd
}

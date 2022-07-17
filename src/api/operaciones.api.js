const { getClient } = require('../clientsoap');
const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionOperaciones?wsdl';
const helpers = require('../lib/helpers');

const addpventa = async (data, empresa) => {
  const {nit, codigo, token} = empresa;
  const params = {...data, nit, codigoSistema:codigo, cuis:'145110CC', codigoAmbiente:2, codigoModalidad:'2'};
  const args = {SolicitudRegistroPuntoVenta: params};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client.registroPuntoVentaAsync(args);
  const result = Object.values(response[0])[0];
  //console.log(client.describe().ServicioFacturacionOperaciones.ServicioFacturacionOperacionesPort.registroPuntoVenta);
  //console.log(result)
  return result;
};

module.exports = {
  addpventa
 // addevento
}
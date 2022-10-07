const EmpresaRepo = require('../db/empresa.repo');
const CodigosRepo = require('../db/codigos.repo');
const SucursalRepo = require('../db/sucursal.repo')
const { getClient } = require('../clientsoap');
const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionCodigos?wsdl';
//const helpers = require('../lib/helpers');

const getcuis = async (codigoSucursal) => {
  const {nit, codigoSistema, token} = await EmpresaRepo.getEmpresa();
  const body = {nit, codigoSistema, codigoSucursal,
                codigoAmbiente:2, codigoModalidad:2, codigoPuntoVenta:0};
  const args = {SolicitudCuis: body};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client.cuisAsync(args);
  const result = Object.values(response[0])[0];
  return {...result, numero};
};

const getcufd = async (sucursal) => {
  const {nit, codigoSistema, token} = await EmpresaRepo.getEmpresa();
  const {codigoSucursal, cuis} = await CodigosRepo.getCUISbySucursal(sucursal);
  const body = {nit, codigoSistema, codigoSucursal, cuis, 
                codigoAmbiente:2, codigoModalidad:2, codigoPuntoVenta:0};
  const args = {SolicitudCufd: body};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client.cufdAsync(args);
  const result = Object.values(response[0])[0];
  return {...result, cuis};
};

module.exports = {
  getcuis,
  getcufd
}

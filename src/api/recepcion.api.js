const { getClient } = require('../clientsoap');
const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/ServicioFacturacionCompraVenta?wsdl';
const CodigosRepo = require('../db/codigos.repo');
const EmpresaRepo = require('../db/empresa.repo');
const FacturaRepo = require('../db/factura.repo');
const UsersRepo = require('../db/users.repo');
const ProductosRepo = require('../db/productos.repo');
const CodigosApi = require('../api/codigos.api');
const {createXML} = require('../lib/createxml');
const helpers = require('../lib/helpers');
const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream/promises');
const zlib = require('zlib');

const addfactura = async (data) => {

  const {cliente, productsid, total, sucursal_id, usuario} = data;

  var cufdVigente = await CodigosRepo.getCUFDbySucursal(sucursal_id);
  if (!cufdVigente){
    const result = await CodigosApi.getcufd(sucursal_id);
    await CodigosRepo.addCUFD(result);
    cufdVigente = await CodigosRepo.getCUFDbySucursal(sucursal_id);
  }

  const {cuis, cufd, codigo_control, codigoSucursal, direccion, municipio, telefono} = cufdVigente;  
  
  const xml_path = path.join(__dirname, "../public/files/factura.xml");
  const gz_path = path.join(__dirname, "..", "public", "files", "factura.gz");
  const xsd_path = path.join(__dirname, "..", "public", "files", "facturaComputarizadaCompraVenta.xsd");

  const {r_social, nit, codigoSistema, token} = await EmpresaRepo.getEmpresa();
  const {numFactura} = await FacturaRepo.getNumeroFactura();
  const fecha = helpers.dateToTimestamp(new Date());
  const cuf = helpers.getCUF(nit.toString(), fecha, codigoSucursal.toString(), '2', '1', '1', '1', numFactura.toString(), '0', codigo_control);

  const {numero_documento, razon_social, tipo_documento_id} = await UsersRepo.getUser(cliente);
  const datos = {nit, r_social, municipio, telefono, numFactura, cuf, cufd, codigoSucursal, 
                direccion, fecha, razon_social, tipo_documento_id, numero_documento, total, usuario};
  const productos = await ProductosRepo.getProductsIN(productsid)

  const xml = createXML(datos, productos);
  fs.writeFileSync(xml_path, xml);
  const validate = helpers.validationXmlXsd(xml, xsd_path);

  if (validate) {
    await pipeline(
      fs.createReadStream(xml_path),
      zlib.createGzip(),
      fs.createWriteStream(gz_path)
    );
    const buff = fs.readFileSync(gz_path);
    const hashArchivo = helpers.getHashCode(buff);
    const archivo = buff.toString('base64');

    const body = {nit, codigoSistema, codigoSucursal, cuis, cufd,
                  archivo, hashArchivo, fechaEnvio: fecha,
                  codigoAmbiente:2, codigoModalidad:2, codigoPuntoVenta:0, 
                  codigoDocumentoSector:1, codigoEmision:1, tipoFacturaDocumento:1};
    const args = {SolicitudServicioRecepcionFactura: body};
    const client = await getClient(url);
    client.addHttpHeader('ApiKey', `TokenApi ${token}`);
    const response = await client.recepcionFacturaAsync(args);
    const result = Object.values(response[0])[0];
    const send = {...result, ...body, numFactura, cuf}
    return send;
  } 
};

const anularfactura = async (data) => {

  const {codigoMotivo, cuf, sucursal_id} = data;

  var cufdVigente = await CodigosRepo.getCUFDbySucursal(sucursal_id);
  if (!cufdVigente){
    const result = await CodigosApi.getcufd(sucursal_id);
    await CodigosRepo.addCUFD(result);
    cufdVigente = await CodigosRepo.getCUFDbySucursal(sucursal_id);
  }

  const {cuis, cufd, codigoSucursal} = cufdVigente;  

  const {nit, codigoSistema, token} = await EmpresaRepo.getEmpresa();
  
  const body = {nit, codigoSistema, codigoSucursal, cuis, cufd, codigoMotivo, cuf,
                codigoAmbiente:2, codigoModalidad:2, codigoPuntoVenta:0, 
                codigoDocumentoSector:1, codigoEmision:1, tipoFacturaDocumento:1};
  const args = {SolicitudServicioAnulacionFactura: body};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client.anulacionFacturaAsync(args);
  const result = Object.values(response[0])[0];
  const send = {...result, ...body}
  return send;
  
};

module.exports = {
  addfactura,
  anularfactura
}

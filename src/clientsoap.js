const soap = require('soap');
const sync_url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionSincronizacion?wsdl';

const getClient = async (url) => {
    try {
        const client = await soap.createClientAsync(url);
        return client;
    } catch (error) {
        console.error(error);
    }
};

const getFunctions = async () => {
    try {
        const client = await getClient(sync_url);
        const describe = client.describe();
        const port = describe.ServicioFacturacionSincronizacion.ServicioFacturacionSincronizacionPort;
        const functions = Object.keys(port);
        const sync_functions = functions.filter(x => x.includes('sincronizar'));
        return sync_functions.sort();
    } catch (error) {
        console.error(error);
    }
};
  
module.exports = {
    getClient,
    getFunctions
};
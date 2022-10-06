const { create } = require('xmlbuilder2');

module.exports = {
  createXML(datos, productos) {
        const xmlStr = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <facturaComputarizadaCompraVenta xsi:noNamespaceSchemaLocation="facturaComputarizadaCompraVenta.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <cabecera>
                <nitEmisor>${datos.nit}</nitEmisor>
                <razonSocialEmisor>${datos.r_social}</razonSocialEmisor>
                <municipio>${datos.municipio}</municipio>
                <telefono>${datos.telefono}</telefono>
                <numeroFactura>${datos.numFactura}</numeroFactura>
                <cuf>${datos.cuf}</cuf>
                <cufd>${datos.cufd}</cufd>
                <codigoSucursal>${datos.codigoSucursal}</codigoSucursal>
                <direccion>${datos.direccion}</direccion>
                <codigoPuntoVenta>0</codigoPuntoVenta>
                <fechaEmision>${datos.fecha}</fechaEmision>
                <nombreRazonSocial>${datos.razon_social}</nombreRazonSocial>
                <codigoTipoDocumentoIdentidad>${datos.tipo_documento_id}</codigoTipoDocumentoIdentidad>
                <numeroDocumento>${datos.numero_documento}</numeroDocumento>
                <complemento xsi:nil="true"/>
                <codigoCliente>${datos.numero_documento}</codigoCliente>
                <codigoMetodoPago>6</codigoMetodoPago>
                <numeroTarjeta xsi:nil="true"/>
                <montoTotal>${datos.total}</montoTotal>
                <montoTotalSujetoIva>${datos.total}</montoTotalSujetoIva>
                <codigoMoneda>1</codigoMoneda>
                <tipoCambio>1</tipoCambio>
                <montoTotalMoneda>${datos.total}</montoTotalMoneda>
                <montoGiftCard xsi:nil="true"/>
                <descuentoAdicional xsi:nil="true"/>
                <codigoExcepcion xsi:nil="true"/>
                <cafc xsi:nil="true"/>
                <leyenda>Ley N° 453: Tienes derecho a recibir información sobre las características y contenidos de los
                servicios que utilices.</leyenda>
                <usuario>${datos.usuario}</usuario>
                <codigoDocumentoSector>1</codigoDocumentoSector>
            </cabecera>
        </facturaComputarizadaCompraVenta>`

        const doc = create(xmlStr);
        for (let producto of productos){
            doc.root().ele('detalle')
                .ele('actividadEconomica').txt(producto.codigo_actividad).up()
                .ele('codigoProductoSin').txt(producto.catalogo_id).up()
                .ele('codigoProducto').txt(producto.codigo).up()
                .ele('descripcion').txt(producto.descripcion).up()
                .ele('cantidad').txt('1').up()
                .ele('unidadMedida').txt(producto.unidad_id).up()
                .ele('precioUnitario').txt(producto.precio).up()
                .ele('montoDescuento').txt('0').up()
                .ele('subTotal').txt(producto.precio).up()
                .ele('numeroSerie').att({'xsi:nil': 'true'}).up()
                .ele('numeroImei').att({'xsi:nil': 'true'}).up()
        }
        const xml = doc.end({ prettyPrint: true });
        //console.log(xml);
        return xml;
  }
}
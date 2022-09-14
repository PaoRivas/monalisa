module.exports = {
  createXML(fecha, cufd, cuf, numero, pventa, cafc = '<cafc xsi:nil="true"/>') {
      xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <facturaComputarizadaCompraVenta xsi:noNamespaceSchemaLocation="facturaComputarizadaCompraVenta.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
          <cabecera>
              <nitEmisor>${nitEmisor}</nitEmisor>
              <razonSocialEmisor>${razonSocialEmisor}</razonSocialEmisor>
              <municipio>${municipio}</municipio>
              <telefono>${telefono}</telefono>
              <numeroFactura>${numero}</numeroFactura>
              <cuf>${cuf}</cuf>
              <cufd>${cufd}</cufd>
              <codigoSucursal>${codigoSucursal}</codigoSucursal>
              <direccion>${direccion}</direccion>
              <codigoPuntoVenta>0</codigoPuntoVenta>
              <fechaEmision>${fecha}</fechaEmision>
              <nombreRazonSocial>${nombreRazonSocial}</nombreRazonSocial>
              <codigoTipoDocumentoIdentidad>${codigoTipoDocumentoIdentidad}</codigoTipoDocumentoIdentidad>
              <numeroDocumento>${numeroDocumento}</numeroDocumento>
              <complemento xsi:nil="true"/>
              <codigoCliente>${numeroDocumento}</codigoCliente>
              <codigoMetodoPago>6</codigoMetodoPago>
              <numeroTarjeta xsi:nil="true"/>
              <montoTotal>${montoTotal}</montoTotal>
              <montoTotalSujetoIva>${montoTotal}</montoTotalSujetoIva>
              <codigoMoneda>1</codigoMoneda>
              <tipoCambio>1</tipoCambio>
              <montoTotalMoneda>${montoTotal}</montoTotalMoneda>
              <montoGiftCard xsi:nil="true"/>
              <descuentoAdicional xsi:nil="true"/>
              <codigoExcepcion xsi:nil="true"/>
              <cafc xsi:nil="true"/>
              <leyenda>${leyenda}</leyenda>
              <usuario>${usuario}</usuario>
              <codigoDocumentoSector>1</codigoDocumentoSector>
          </cabecera>
          <detalle>
              <actividadEconomica>${actividadEconomica}</actividadEconomica>
              <codigoProductoSin>${codigoProductoSin}</codigoProductoSin>
              <codigoProducto>${codigoProducto}</codigoProducto>
              <descripcion>${descripcion}</descripcion>
              <cantidad>1</cantidad>
              <unidadMedida>58</unidadMedida>
              <precioUnitario>${precioUnitario}</precioUnitario>
              <montoDescuento>0</montoDescuento>
              <subTotal>${precioUnitario}</subTotal>
              <numeroSerie xsi:nil="true"/>
              <numeroImei xsi:nil="true"/>
          </detalle>
      </facturaComputarizadaCompraVenta>`
      return xml;
  }
}
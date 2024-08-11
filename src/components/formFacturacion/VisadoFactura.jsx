
import React, { useEffect, useState, useRef } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import FacturacionService from '../../services/FacturacionService'

function VisadoFactura() {

    const { id } = useParams();
    const [factura, setFactura] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        FacturacionService.getFacturaByID(id,controller).then
        ((response) => setFactura(response.data)).catch
        (error => console.log(error));
        return () => controller.abort();
    }, [])



  return (
   <>
        { factura && <Container>
            <Row>
                <Col><h2>Facturacion a {factura.cliente.nombreCompleto}</h2></Col>
            </Row>
            <Container>
                <Row>
                    <Col>Fecha: {factura.fecha}</Col>
                    <Col>Nombre Completo: {factura.cliente.nombreCompleto}</Col>
                    <Col>Cuil/Cuit/Dni: {factura.cliente.cuilDNI}</Col>
                </Row>
                <Row>
                    <Col>Direccion: {factura.cliente.direccion}</Col>
                    <Col>Telefono: {factura.cliente.telefono}</Col>
                    <Col>Email: {factura.cliente.email}</Col>
                </Row>
            </Container>
            <Container>
                    <Table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Codigo:</th>
                                <th>Cantidad:</th>
                                <th>Detalle:</th>
                                <th>Precio unitario:</th>
                                <th>Subtotal:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                factura.items.map((it) => {
                                    return (<tr key={it.idItemFactura}>
                                        <td>{it.producto.codigoDeBarras}</td>
                                        <td>{it.cantidad}</td>
                                        <td>{it.nombreProducto}</td>
                                        <td>{it.precio}</td>
                                        <td>{it.subTotal}</td>
                                    </tr>)
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Importe total:</td>
                                <td>{factura.total}</td>
                            </tr>
                        </tfoot>
                    </Table>   
            </Container>
        </Container>}
   </>
    
  )
}

export default VisadoFactura
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import FacturacionService from '../../services/FacturacionService'
import ClienteService from '../../services/ClienteService';

function VerListaFacturas() {
    const ConsumidorFinal = {
        type: 'ConsumidorFinal',
        idCliente: -1,
        nombreCompleto: 'Consumidor Final',
        cuilDNI: 'xx-XXXXXXXX-x',
        direccion: 'Calle Sin Nombre S/N',
        telefono: 'XX-YYYY-ZZZZ',
        email: 'consumidor@final.net',
        deAlta: true,
    }

    const TodosLosClientes = {
        type: 'Todos',
        idCliente: -2,
        nombreCompleto: 'Todos los clientes',
        cuilDNI: 'xx-XXXXXXXX-x',
        direccion: 'Calle Sin Nombre S/N',
        telefono: 'XX-YYYY-ZZZZ',
        email: 'clientes@todos.net',
        deAlta: true,
    }

    const [cliente, setCliente] = useState({});
    const [listadoClientes, setListadoClientes] = useState([]);
    const [listadoFacturas, setListadoFacturas] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        ClienteService.getClientes(controller).then
            ((response) => {
                const listado = response.data.map((clie) => {
                    if (clie.deAlta)
                        return clie;
                });
                setListadoClientes(listado);
                setCliente(TodosLosClientes);
            }).catch
            (error => console.log(error));
        return () => controller.abort();
    }, [])

    useEffect(() => {
        const controller = new AbortController();
        if (cliente.idCliente == -2){
            FacturacionService.getFacturas(controller).then(
                (response) => setListadoFacturas(response.data)
            ).catch(
                error => console.log(error)
            )
        }
        else {
            FacturacionService.getFacturasByCliente(cliente.idCliente, controller).then(
                (response) => {
                    setListadoFacturas(response.data);
                }
            ).catch
                (error => console.log(error));
        }
        
        return () => controller.abort();
    }, [cliente])

    return (
        <Container>
            <Row>
                <Col><h2>Listado de Facturas de: {cliente.nombreCompleto}</h2></Col>
                <Col><label htmlFor='sel-cliente'>Elige cliente:</label><select id="sel-cliente" className='form-select' value={JSON.stringify(cliente)}
                    onChange={(e) => {
                        setCliente(JSON.parse(e.target.value));
                    }}>
                    <option key={TodosLosClientes.idCliente} value={JSON.stringify(TodosLosClientes)}>
                        {TodosLosClientes.nombreCompleto}
                    </option>
                    <option key={ConsumidorFinal.idCliente} value={JSON.stringify(ConsumidorFinal)}>
                        {ConsumidorFinal.nombreCompleto}
                    </option>
                    {
                        listadoClientes.map((clie) => {
                            return <option key={clie.idCliente} value={JSON.stringify(clie)}>{clie.nombreCompleto}</option>
                        })
                    }
                </select></Col>
            </Row>
            <Row>
                <Table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Numero Factura:</th>
                            <th>Cliente: </th>
                            <th>Fecha: </th>
                            <th>Monto total: </th>
                            <th>Ver detalles de factura</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listadoFacturas.map((fact) => {
                            return <tr key={fact.idFactura}>
                                <td>{fact.idFactura}</td>
                                <td>{fact.cliente.nombreCompleto}</td>
                                <td>{fact.fecha}</td>
                                <td>{fact.total}</td>
                                <td></td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

export default VerListaFacturas
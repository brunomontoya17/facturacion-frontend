import { useEffect, useState } from 'react'
import ClienteService from '../../services/ClienteService'
import ProveedorService from '../../services/ProveedorService'
import { Container, Table } from 'react-bootstrap'
import { typesEnte } from '../../logics/config';
import { Link } from 'react-router-dom';

function ListadoEntes(props) {

    const [listado,setListado] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        if (props.entidad==typesEnte.cliente) {
            ClienteService.getClientes(controller).then
            (response => setListado(response.data)).catch
            (error => console.log(error));
        }
        if (props.entidad==typesEnte.proveedor) {
            ProveedorService.getProveedores(controller).then
            (response => setListado(response.data)).catch
            (error => console.log(error));
        }
        return () => controller.abort();
    },[props.entidad])

  return (
    <Container>
        <h2>Listado de {props.entidad}</h2>
        <Table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>ID:</th>
                    <th>Nombre Completo:</th>
                    <th>Personeria:</th>
                    <th>DNI/CUIT/CUIL:</th>
                    <th>Direccion:</th>
                    <th>Telefono:</th>
                    <th>Email:</th>
                    <th>Modificar:</th>
                </tr>
            </thead>
            <tbody>
                {listado.map((ente) => {
                    return (
                        <tr key={(() => {
                            if (props.entidad==typesEnte.cliente)
                                return ente.idCliente
                            if (props.entidad==typesEnte.proveedor)
                                return ente.idProveedor
                        })()}>
                            <td>{(() => {
                            if (props.entidad==typesEnte.cliente)
                                return ente.idCliente
                            if (props.entidad==typesEnte.proveedor)
                                return ente.idProveedor
                        })()}</td>
                            <td>{ente.nombreCompleto}</td>
                            <td>{ente.type}</td>
                            <td>{ente.cuilDNI}</td>
                            <td>{ente.direccion}</td>
                            <td>{ente.telefono}</td>
                            <td><a href={`mailto:${ente.email}`}>{ente.email}</a></td>
                            <td>{(() => {
                            if (props.entidad==typesEnte.cliente)
                                return <Link to={`/entes/clientes/update/${ente.idCliente}`} >
                            <button className="button">Modificar</button>
                        </Link>
                            if (props.entidad==typesEnte.proveedor)
                                return <Link to={`/entes/proveedores/update/${ente.idProveedor}`} >
                            <button className="button">Modificar</button>
                        </Link>
                        })()}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    </Container>
  )
}

export default ListadoEntes
import { Link } from "react-router-dom";
import MarcaService from "../../services/MarcaService";
import { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";

function ListadoMarcas() {
    
    const [listado, setListado] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        MarcaService.getMarcas(controller).then
            (response => setListado(response.data)).catch
            (error => console.log(error));
        return () => controller.abort();
    }, [])

    return (
        <Container>
            <h2>Listado de Marcas</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Modificar</th>
                    </tr>
                </thead>
                <tbody>
                    {listado.map((marca) => {
                        return (
                            <tr key={marca.idMarca}>
                                <td>{marca.idMarca}</td>
                                <td>{marca.nombreMarca}</td>
                                <td>{marca.descripcion}</td>
                                <td><Link to={"/marcas/update/"+marca.idMarca} >
                                    <button className="button">Modificar</button>
                                    </Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Container>
    );
}

export default ListadoMarcas;
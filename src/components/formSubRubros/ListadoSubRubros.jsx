import { useEffect, useState, useRef } from "react";
import SubRubroService from "../../services/SubRubroService";
import { Link } from "react-router-dom";

function ListadoSubRubros() 
{
    const [listado, setListado] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        SubRubroService.getSubRubros(controller).then
            (response => setListado(response.data)).catch
            (error => console.log(error));
        return () => controller.abort();
    }, [])

    return (
        <div className="container">
            <h2>Listado de SubRubros</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Rubro Padre</th>
                        <th>Modificar</th>
                    </tr>
                </thead>
                <tbody>
                    {listado.map((subrubro) => {
                        return (
                            <tr key={subrubro.idSubRubro}>
                                <td>{subrubro.idSubRubro}</td>
                                <td>{subrubro.nombreSubRubro}</td>
                                <td>{subrubro.descripcion}</td>
                                <td>{subrubro.rubroPadre.nombreRubro}</td>
                                <td><Link to={"/subrubros/update/"+subrubro.idSubRubro} >
                                    <button className="button">Modificar</button>
                                    </Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ListadoSubRubros;
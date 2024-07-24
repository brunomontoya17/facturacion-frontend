import { Link } from "react-router-dom";
import RubroService from "../../services/RubroService";
import { useEffect, useState, useRef } from "react";


function ListadoRubros() {

    const [listado, setListado] = useState([]);

    const effectRan = useRef(false)

    useEffect(() => {
        const controller = new AbortController();
        RubroService.getRubros(controller).then
            (response => setListado(response.data)).catch
            (error => console.log(error));
        return () => controller.abort()
    }, [])

    const writeJerarquia = (rub) => {
        let jerarquia = [];
        jerarquia.unshift(rub.nombreRubro);
        let next = rub;
        while (next.rubroPadre!=null) {
            jerarquia.unshift(next.rubroPadre.nombreRubro);
            next = next.rubroPadre;
        }
        return (<ol>
            {jerarquia.map( (el,index) => <li key={index}>{el}</li>)}
        </ol>);
    }

    return (
        <div className="container">
            <h2>Listado de Rubros</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID:</th>
                        <th>Nombre:</th>
                        <th>Descripcion:</th>
                        <th>Nivel de Rubro:</th>
                        <th>Jerarquia:</th>
                        <th>Modificar:</th>
                    </tr>
                </thead>
                <tbody>
                    {listado.map((rubro) => {
                        return (
                            <tr key={rubro.idRubro}>
                                <td>{rubro.idRubro}</td>
                                <td>{rubro.nombreRubro}</td>
                                <td>{rubro.descripcion}</td>
                                <td>{rubro.nivelRubro}</td>
                                <td>{(writeJerarquia(rubro))}</td>
                                <td><Link to={"/rubros/update/" + rubro.idRubro} >
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

export default ListadoRubros;
import { useEffect, useState, useRef } from "react";
import ProductoService from "../../services/ProductoService";
import { Link } from "react-router-dom";
import PlanillaStockModal from "./modalsComponents/PlanillaStockModal";

function ListadoProductos() {

    const [listado, setListado] = useState([]);
    const [show, setShow] = useState(false);
    const closePlanilla = () => setShow(false);
    const [product,setProduct] = useState({});

    useEffect(() => {
        const controller = new AbortController();
        ProductoService.getProductos(controller).then
            (response => setListado(response.data)).catch
            (error => console.log(error));
        return () => controller.abort();
    }, [])

    function openPlanilla() {       
        setShow(true);
    }

    const writeJerarquia = (rub) => {
        let jerarquia = [];
        jerarquia.unshift(rub.nombreRubro);
        let next = rub;
        while (next.rubroPadre!=null) {
            jerarquia.unshift(next.rubroPadre.nombreRubro);
            next = next.rubroPadre;
        }
        return (<ol>
            {jerarquia.map( el => <li>{el}</li>)}
        </ol>);
    }

    return (
        <div className="container">
            <h2>Listado de productos</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Rubro</th>
                        <th>Marca</th>
                        <th>Fecha Creacion</th>
                        <th>Ver detalles</th>
                        <th>Modificar</th>
                        <th>Planilla Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {listado.map((producto) => {
                        return (
                            <tr key={producto.idProducto}>
                                <td>{producto.codigoDeBarras}</td>
                                <td>{producto.nombreProducto}</td>
                                <td>{producto.precio}</td>
                                <td>{(writeJerarquia(producto.rubro))}</td>
                                <td>{producto.marca?.nombreMarca}</td>
                                <td>{producto.fecha_creacion}</td>
                                <td><Link to={"/productos/" + producto.idProducto} >
                                    <button className="button">Ver</button>
                                </Link></td>
                                <td><Link to={"/productos/update/" + producto.idProducto} >
                                    <button className="button">Modificar</button>
                                </Link></td>
                                <td><button className="button" onClick={(e) => {
                                    setProduct(producto);
                                    openPlanilla();
                                }}>Abrir planilla</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <PlanillaStockModal show={show} closePlanilla={closePlanilla} producto={product} />
        </div>
    );
}

export default ListadoProductos;
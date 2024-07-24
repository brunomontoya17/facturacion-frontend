import { useEffect, useRef, useState } from "react";
import ProductoService from "../../services/ProductoService";
import { Link, useParams, useNavigate } from "react-router-dom";
import PlanillaStockModal from "./modalsComponents/PlanillaStockModal";
import PageViewerField from "./fieldsComponents/PageViewerField";
import { typesPages } from "../../logics/config";
import { Container, Col, Row } from "react-bootstrap";

function ListadoProductos(props) {

    const [listado, setListado] = useState([]);
    const [show, setShow] = useState(false);
    const closePlanilla = () => setShow(false);
    const [product, setProduct] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { page } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        setCurrentPage(parseInt(page));
        if (props.pagesize.size === typesPages.one_hundred.size) {
            ProductoService.getProductosx100(page, controller).then
                (response => {
                    setListado(response.data.content);
                    setTotalPages(response.data.totalPages);
                }).catch
                (error => console.log(error));
        }
        if (props.pagesize.size === typesPages.fifty.size) {
            ProductoService.getProductosx50(page, controller).then
                (response => {
                    setListado(response.data.content);
                    setTotalPages(response.data.totalPages);
                }).catch
                (error => console.log(error));
        }
        if (props.pagesize.size === typesPages.twenty_five.size) {
            ProductoService.getProductosx25(page, controller).then
                (response => {
                    setListado(response.data.content);
                    setTotalPages(response.data.totalPages);
                }).catch
                (error => console.log(error));
        }
        return () => controller.abort();
    }, [props.pagesize, page])

    function openPlanilla() {
        setShow(true);
    }

    const writeJerarquia = (rub) => {
        let jerarquia = [];
        jerarquia.unshift(rub.nombreRubro);
        let next = rub;
        while (next.rubroPadre != null) {
            jerarquia.unshift(next.rubroPadre.nombreRubro);
            next = next.rubroPadre;
        }
        return (<ol>
            {jerarquia.map((el, index) => <li key={index + 1}>{el}</li>)}
        </ol>);
    }


    return (
        <div className="container">
            <Container>
                <Row>
                    <Col><h2>Listado de productos</h2></Col>
                    <Col><label>Mostrar de a: </label><select value={props.pagesize.link} onChange={(e) => {
                        navigate(`${e.target.value}1`);
                    }}>
                        <option value={typesPages.one_hundred.link}>{typesPages.one_hundred.size + " Productos"}</option>
                        <option value={typesPages.fifty.link}>{typesPages.fifty.size + " Productos"}</option>
                        <option value={typesPages.twenty_five.link}>{typesPages.twenty_five.size + " Productos"}</option>
                    </select></Col>
                </Row>

            </Container>

            <PageViewerField key={'UPSIDE'} formatlink={props.pagesize.link} current={currentPage} totalP={totalPages} />
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
            <PageViewerField key={"DOWNSIDE"} formatlink={props.pagesize.link} current={currentPage} totalP={totalPages} />
            <PlanillaStockModal show={show} closePlanilla={closePlanilla} producto={product} />
        </div>
    );
}

export default ListadoProductos;
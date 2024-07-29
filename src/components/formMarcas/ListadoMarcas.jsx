import { Link, useParams, useNavigate } from "react-router-dom";
import MarcaService from "../../services/MarcaService";
import { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { typePagesRyM } from "../../logics/config";
import PageViewerField from "../generalComponents/PageViewerField";

function ListadoMarcas(props) {
    
    const [listado, setListado] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { page } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        setCurrentPage(parseInt(page));
        if (props.pagesize == typePagesRyM.fifty){
            MarcaService.getMarcasx50(page,controller).then
            (response => {
                setListado(response.data.content);
                setTotalPages(response.data.totalPages);
            }).catch
            (error => console.log(error));
        }
        if (props.pagesize == typePagesRyM.twenty_five){
            MarcaService.getMarcasx25(page,controller).then
            (response => {
                setListado(response.data.content);
                setTotalPages(response.data.totalPages);
            }).catch
            (error => console.log(error));
        }
        if (props.pagesize == typePagesRyM.ten){
            MarcaService.getMarcasx10(page,controller).then
            (response => {
                setListado(response.data.content);
                setTotalPages(response.data.totalPages);
            }).catch
            (error => console.log(error));
        }
        return () => controller.abort();
    }, [props.pagesize,page])

    return (
        <Container>
            <Container>
                <Row>
                    <Col><h2>Listado de marcas</h2></Col>
                    <Col><label>Mostrar de a: </label><select value={props.pagesize.linkM} onChange={(e) => {
                        navigate(`${e.target.value}1`);
                    }}>
                        <option value={typePagesRyM.fifty.linkM}>{typePagesRyM.fifty.size + " Marcas"}</option>
                        <option value={typePagesRyM.twenty_five.linkM}>{typePagesRyM.twenty_five.size + " Marcas"}</option>
                        <option value={typePagesRyM.ten.linkM}>{typePagesRyM.ten.size + " Marcas"}</option>
                    </select></Col>
                </Row>

            </Container>
            <PageViewerField key="UPSIDE" formatlink={props.pagesize.linkM} current={currentPage} totalP={totalPages} />
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
            <PageViewerField key="DOWNSIDE" formatLink={props.pagesize.linkM} current={currentPage} totalP={totalPages} />
        </Container>
    );
}

export default ListadoMarcas;
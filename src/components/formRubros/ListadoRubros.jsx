import { Link, useParams, useNavigate } from "react-router-dom";
import RubroService from "../../services/RubroService";
import { useEffect, useState, useRef } from "react";
import { typePagesRyM } from "../../logics/config";
import { Container, Row, Col } from "react-bootstrap";
import PageViewerField from "../generalComponents/PageViewerField";


function ListadoRubros(props) {

    const [listado, setListado] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { page } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        setCurrentPage(parseInt(page));
        if(props.pagesize==typePagesRyM.fifty) {
            RubroService.getRubrosx50(page,controller).then
            (response => {
                setListado(response.data.content);
                setTotalPages(response.data.totalPages);
            }).catch
            (error => console.log(error));
        }
        if(props.pagesize==typePagesRyM.twenty_five) {
            RubroService.getRubrosx25(page,controller).then
            (response => {
                setListado(response.data.content);
                setTotalPages(response.data.totalPages);
            }).catch
            (error => console.log(error));
        }
        if(props.pagesize==typePagesRyM.ten) {
            RubroService.getRubrosx10(page,controller).then
            (response => {
                setListado(response.data.content);
                setTotalPages(response.data.totalPages);
            }).catch
            (error => console.log(error));
        }
        return () => controller.abort()
    }, [props.pagesize,page])

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
            <Container>
                <Row>
                    <Col><h2>Listado de rubros</h2></Col>
                    <Col><label>Mostrar de a: </label><select value={props.pagesize.linkR} onChange={(e) => {
                        navigate(`${e.target.value}1`);
                    }}>
                        <option value={typePagesRyM.fifty.linkR}>{typePagesRyM.fifty.size + " Rubros"}</option>
                        <option value={typePagesRyM.twenty_five.linkR}>{typePagesRyM.twenty_five.size + " Rubros"}</option>
                        <option value={typePagesRyM.ten.linkR}>{typePagesRyM.ten.size + " Rubros"}</option>
                    </select></Col>
                </Row>

            </Container>
            <PageViewerField key="UPSIDE" formatlink={props.pagesize.linkR} current={currentPage} totalP={totalPages} />
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
            <PageViewerField key="DOWNSIDE" formatLink={props.pagesize.linkR} current={currentPage} totalP={totalPages} />
        </div>
    );
}

export default ListadoRubros;
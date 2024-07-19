import { Container, Row, Col, Table } from 'react-bootstrap'
import { ProductoContext } from './ProductoContext';
import { useParams, useNavigate } from 'react-router-dom';
import ProductoService from '../../services/ProductoService';
import { useContext, useEffect, useRef, useState } from 'react';


function VisadoProducto() {

    const [producto, setProducto, ,
        , , ,
        , ,
        , ,
        EmptySubRubro, EmptyMarca, EmptyPlanilla,
        ,] = [...useContext(ProductoContext)];

    const { id } = useParams();

    const wideHalves = {
        width:'50%',
        float:'left'};

    useEffect(() => {
        const controller = new AbortController();
        ProductoService.getProductoByID(id, controller).then
            ((response) => {

                let dataResp = { ...response.data };

                if (dataResp.subRubro == null)
                    dataResp.subRubro = new EmptySubRubro();
                if (dataResp.marca == null)
                    dataResp.marca = new EmptyMarca();
                if (dataResp.planillaStock == null) {
                    dataResp.planillaStock = new EmptyPlanilla();
                }
                setProducto(dataResp);
            }).catch
            (error => console.log(error));
        return () => controller.abort();
    }, [id])

    return (
        <Container>
            <Col style={wideHalves}>
                <Row>
                    <Col><h2>Nombre producto:</h2></Col>
                    <Col><h2>{producto.nombreProducto}</h2></Col>
                </Row>
                <Row>
                    <Col><label>Codigo de barras:</label></Col>
                    <Col><label>{producto.codigoDeBarras}</label></Col>
                </Row>
                <Row>
                    <Col><label>Descripcion</label></Col>
                    <Col><p>{producto.descripcion}</p></Col>
                </Row>
                <Row>
                    <Col><label>Precio:</label></Col>
                    <Col><label>{producto.precio}</label></Col>
                </Row>
                <Row>
                    <Col><label>Rubro:</label></Col>
                    <Col><label>{producto.rubro.nombreRubro}</label></Col>
                </Row>
                <Row>
                    <Col><label>SubRubro:</label></Col>
                    <Col><label>{producto.subRubro.nombreSubRubro}</label></Col>
                </Row>
                <Row>
                    <Col><label>Marca:</label></Col>
                    <Col><label>{producto.marca.nombreMarca}</label></Col>
                </Row>
                <Row><h2>Creacion y modificaciones</h2></Row>
                <Row>
                    <Col><label>Fecha de creacion:</label></Col>
                    <Col><label>{producto.fecha_creacion}</label></Col>
                </Row>
                <Row>
                    <Col><label>Modificacion de precio:</label></Col>
                    <Col><label>{producto.fecha_modificacion_precio}</label></Col>
                </Row>
                <Row>
                    <Col><label>Modificaciones generales:</label></Col>
                    <Col><label>{producto.fecha_modificacion}</label></Col>
                </Row>
            </Col>
            <Col style={wideHalves}>
            { producto.planillaStock.idPlanillaStock!=0 ? (
                <>
                <h2>Stock de {producto.nombreProducto}</h2>
                <Table striped bordered hover size="sm">
                    <tbody>
                <tr>
                    <td>Cantidad actual:</td><td>{producto.planillaStock.cantidad_stock}</td>
                </tr>
                <tr>
                    <td>Cantidad critica:</td><td>{producto.planillaStock.cantidad_critica}</td>
                </tr>
                <tr>
                    <td>Ultima entrada:</td><td>{producto.planillaStock.fecha_ultima_entrada}</td>
                </tr>
                <tr>
                    <td>Cantidad entrada:</td><td>{producto.planillaStock.cantidad_ultima_entrada}</td>
                </tr>
                <tr>
                    <td>Ultima salida:</td><td>{producto.planillaStock.fecha_ultima_salida}</td>
                </tr>
                <tr>
                    <td>Cantidad salida:</td><td>{producto.planillaStock.cantidad_ultima_salida}</td>
                </tr>
                <tr>
                    <td>Ultimo ajuste:</td><td>{producto.planillaStock.fecha_ultimo_ajuste}</td>
                </tr>
                <tr>
                    <td>Ajuste:</td><td>{producto.planillaStock.diferencia_ajuste}</td>
                </tr>
                <tr>
                    <td>El Stock es critico:</td><td>{producto.planillaStock.isStockCritico ? 'Falta poco para agotarse' : 'El Stock es normal'}</td>
                </tr>
                </tbody>
                </Table>
                </>
            ) 
             : <></>}
            </Col>
        </Container>
    )
}

export default VisadoProducto
import { useContext, useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Behavior } from '../../logics/config';
import ProductoService from '../../services/ProductoService';
import { ProductoContext } from './ProductoContext';
import { useParams, useNavigate } from 'react-router-dom';
import CodBarraField from './fieldsComponents/CodBarraField';
import DescField from './fieldsComponents/DescField';
import NameField from './fieldsComponents/NameField';
import PriceField from './fieldsComponents/PriceField';
import MarcaSelectorField from './fieldsComponents/MarcaSelectorField';
import PlanillaStockField from './fieldsComponents/PlanillaStockField';
import RubroSelectorField from './fieldsComponents/RubroSelectorField';
import SubRubroSelectorField from './fieldsComponents/SubRubroSelectorField';

function FormBaseProductos(props) {

    const [producto, setProducto, EmptyProducto,
        rubros, marcas, manejoStock, setManejoStock, 
        EmptyMarca, EmptyPlanilla, lastAddSelectedRubro, lastAddSelectedMarca] = [...useContext(ProductoContext)];

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const controller = new AbortController();
        if (props.behavior == Behavior.agregar) {
            lastAddSelectedRubro.current = rubros[0];
            const prod = new EmptyProducto();
            setProducto(prod);
        }
        if (props.behavior == Behavior.modificar) {
            ProductoService.getProductoByID(id, controller).then
                ((response) => {
                    console.log(response.data);
                    let dataResp = {...response.data};
                    console.log(dataResp);
                    if (dataResp.marca == null)
                        dataResp.marca = new EmptyMarca();
                    if (dataResp.planillaStock == null) {
                        dataResp.planillaStock = new EmptyPlanilla();
                        setManejoStock(false);
                    }   
                    setProducto(dataResp);
                }).catch
                (error => console.log(error));
            
        }
        return () => controller.abort();
    }, [props.behavior])

    const agregarProducto = (e) => {
        e.preventDefault();
        lastAddSelectedRubro.current = producto.rubro;
        lastAddSelectedMarca.current = producto.marca;
        if (producto.marca.idMarca === 0)
            producto.marca = null;
        if (manejoStock)
            delete producto.planillaStock.idPlanillaStock;
        else
            producto.planillaStock = null;
        ProductoService.addProducto(producto).then((response) => {
            console.log(response.data);
            navigate('/productos');
        }).catch(error => console.log(error));
    }

    const modificarProducto = (e) => {
        e.preventDefault();
        if (producto.marca.idMarca === 0)
            producto.marca = null;
        if (producto.planillaStock.idPlanillaStock === 0)
            delete producto.planillaStock.idPlanillaStock;
        ProductoService.updateProducto(producto).then((response) => {
            console.log(response.data);
            navigate("/productos");
        }).catch(error => console.log(error));
    }

    return (
        <Container>
            <form onSubmit={(e) => {
                if (props.behavior == Behavior.agregar)
                    agregarProducto(e);
                if (props.behavior == Behavior.modificar)
                    modificarProducto(e);
            }}>
                {(() => {
                    if (props.behavior == Behavior.agregar)
                        return (<h2>Agregar Producto</h2>)
                    if (props.behavior == Behavior.modificar)
                        return (<h2>Modificar Producto</h2>)
                })()}
                <CodBarraField behavior={props.behavior}/>
                <NameField />
                <DescField />
                <PriceField />
                <RubroSelectorField />
                <MarcaSelectorField />
                <PlanillaStockField />
                {(() => {
                    if (props.behavior == Behavior.agregar)
                        return (<Row>
                            <Col><label htmlFor='addProducto'>Agregar Producto:</label></Col>
                            <Col><input id="addProducto " type="submit" value={"Agregar Producto"} /></Col>
                        </Row>)
                    if (props.behavior == Behavior.modificar)
                        return (<Row>
                            <Col><label htmlFor='updProducto'>Modificar Producto:</label></Col>
                            <Col><input id="updProducto " type="submit" value={"Modificar Producto"} /></Col>
                        </Row>)
                })()}
            </form>
        </Container>
    )
}

export default FormBaseProductos;
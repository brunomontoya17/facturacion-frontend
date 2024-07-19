import { Row, Col } from "react-bootstrap"
import { useContext } from "react";
import { ProductoContext } from "../ProductoContext";

function PriceField() {
    
    const [producto, setProducto] = [ ...useContext(ProductoContext) ];
    return (
        <Row>
            <Col><label htmlFor="price">Precio:</label></Col>
            <Col><input type='number' id='price' min={0.0} step={1} value={producto.precio}
                onChange={(e) => {
                    setProducto(({
                        ...producto,
                        precio: e.target.value
                    }))
                }} /></Col>
        </Row>
    )
}

export default PriceField
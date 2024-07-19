import { Row, Col } from "react-bootstrap"
import { useContext } from "react";
import { ProductoContext } from "../ProductoContext";

function NameField() {

    const [producto, setProducto] = [ ...useContext(ProductoContext) ];
    return (
        <Row>
            <Col><label htmlFor='name'>Nombre Producto:</label></Col>
            <Col><input id='name' type='text' value={producto.nombreProducto}
                onChange={(e) => {
                    setProducto(({
                        ...producto,
                        nombreProducto: e.target.value
                    }))
                }} /></Col>
        </Row>
    )
}

export default NameField
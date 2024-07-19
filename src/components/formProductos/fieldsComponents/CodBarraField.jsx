import { Row, Col } from "react-bootstrap"
import { useContext } from "react";
import { ProductoContext } from "../ProductoContext";
import { Behavior } from "../../../logics/config";

function CodBarraField(props) {

    const [producto, setProducto] = [ ...useContext(ProductoContext) ];

    return (
        <Row>
            <Col><label htmlFor='codbarra'>Codigo de Barras:</label></Col>
            <Col><input id='codbarra' type='text' readOnly={props.behavior==Behavior.modificar} value={producto.codigoDeBarras}
                onChange={(e) => {
                    setProducto(({
                        ...producto,
                        codigoDeBarras: e.target.value
                    }))
                }} /></Col>
        </Row>
    )
}

export default CodBarraField
import { useContext } from "react";
import { ClieProvContext } from "../ClieProvContext";
import { Row, Col } from "react-bootstrap";

function DireccionField() {
    const [clieprov, setClieprov,] = useContext(ClieProvContext);
    return (
        <Row>
            <Col><label htmlFor='direccion'>Direccion:</label></Col>
            <Col><input type="text" id='direccion' value={clieprov.direccion}
            onChange={(e) => {
                setClieprov(({
                    ...clieprov,
                    direccion:e.target.value,
                }))
            }}/></Col>
        </Row>
    )
}

export default DireccionField
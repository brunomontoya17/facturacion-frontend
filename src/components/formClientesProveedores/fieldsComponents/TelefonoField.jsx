import { useContext } from "react";
import { ClieProvContext } from "../ClieProvContext";
import { Row, Col } from "react-bootstrap";

function TelefonoField() {
    const [clieprov, setClieprov,] = useContext(ClieProvContext);
    return (
        <Row>
            <Col><label htmlFor='telefono'>Telefono:</label></Col>
            <Col><input type="text" id='telefono' value={clieprov.telefono}
            onChange={(e) => {
                setClieprov(({
                    ...clieprov,
                    telefono:e.target.value,
                }))
            }}/></Col>
        </Row>
    )
}

export default TelefonoField
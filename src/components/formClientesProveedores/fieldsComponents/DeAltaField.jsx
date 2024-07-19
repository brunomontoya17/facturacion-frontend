import { useContext } from "react";
import { ClieProvContext } from "../ClieProvContext";
import { Row, Col } from "react-bootstrap";

function DeAltaField() {
    const [clieprov, setClieprov,] = useContext(ClieProvContext);
    return (
        <Row>
            <Col><label htmlFor='dealta'>Estado de Alta:</label></Col>
            <Col><input type='checkbox' id='dealta' checked={clieprov.deAlta}
                onChange={(e) => {
                    setClieprov(({
                        ...clieprov,
                        deAlta:e.target.checked,
                    }))
                }} /></Col>
        </Row>
    )
}

export default DeAltaField
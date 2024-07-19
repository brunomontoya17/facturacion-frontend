import { useContext } from "react";
import { ClieProvContext } from "../ClieProvContext";
import { Row, Col } from "react-bootstrap";

function RazonSocialField() {
    const [clieprov, setClieprov,] = useContext(ClieProvContext);
    return (
        <Row>
            <Col><label htmlFor='rsocial'>Razon Social:</label></Col>
            <Col><input type='text' id='rsocial' value={clieprov.razonSocial}
                onChange={(e) => {
                    setClieprov(({
                        ...clieprov,
                        razonSocial: e.target.value,
                    }))
                }} /></Col>
        </Row>
    )
}

export default RazonSocialField
import { useContext } from "react";
import { ClieProvContext } from "../ClieProvContext";
import { Row, Col } from "react-bootstrap";

function CuitCuilField() {
    const [clieprov, setClieprov,] = useContext(ClieProvContext);
    return (
        <Row>
            <Col><label htmlFor='cuit'>CUIL/CUIT:</label></Col>
            <Col><input type='text' id='cuit' value={clieprov.cuit_cuil}
            onChange={(e) => {
                setClieprov(({
                    ...clieprov,
                    cuit_cuil:e.target.value,
                }))
            }}/></Col>
        </Row>
    )
}

export default CuitCuilField
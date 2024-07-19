import { useContext } from "react";
import { ClieProvContext } from "../ClieProvContext";
import { Row, Col } from "react-bootstrap";

function DniField() {
    const [clieprov, setClieprov,] = useContext(ClieProvContext);
    return (
        <Row>
            <Col><label htmlFor='dni'>DNI:</label></Col>
            <Col><input type="number" step={1} id='dni' value={clieprov.dni}
            onChange={(e) => {
                setClieprov(({
                    ...clieprov,
                    dni:e.target.value,
                }))
            }} /></Col>
        </Row>
    )
}

export default DniField
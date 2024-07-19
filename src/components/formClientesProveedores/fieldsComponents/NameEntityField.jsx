import { useContext } from "react";
import { ClieProvContext } from "../ClieProvContext";
import { Row, Col } from "react-bootstrap";

function NameEntityField() {
    const [clieprov, setClieprov,] = useContext(ClieProvContext);
    return (
        <Row>
            <Col><label htmlFor='name'>Nombre:</label></Col>
            <Col><input type='text' id='name' value={clieprov.nombre}
            onChange={(e) => {
                setClieprov(({
                    ...clieprov,
                    nombre:e.target.value,
                }))
            }}/></Col>
        </Row>
    )
}

export default NameEntityField
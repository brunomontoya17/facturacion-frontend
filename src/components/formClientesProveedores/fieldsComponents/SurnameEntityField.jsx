import { useContext } from "react";
import { ClieProvContext } from "../ClieProvContext";
import { Row, Col } from "react-bootstrap";

function SurnameEntityField() {
    const [clieprov, setClieprov,] = useContext(ClieProvContext);
    return (
        <Row>
            <Col><label htmlFor='surname'>Apellido:</label></Col>
            <Col><input type='text' id='surname' value={clieprov.apellido} 
            onChange={(e) => {
                setClieprov(({
                    ...clieprov,
                    apellido:e.target.value,
                }))
            }}/></Col>
        </Row>
    )
}

export default SurnameEntityField
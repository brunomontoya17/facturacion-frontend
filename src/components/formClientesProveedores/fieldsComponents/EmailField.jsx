import { useContext } from "react";
import { ClieProvContext } from "../ClieProvContext";
import { Row, Col } from "react-bootstrap";

function EmailField() {
    const [clieprov, setClieprov,] = useContext(ClieProvContext);
    return (
        <Row>
            <Col><label htmlFor='email'>Email:</label></Col>
            <Col><input type="text" id='email' value={clieprov.email}
            onChange={(e) => {
                setClieprov(({
                    ...clieprov,
                    email:e.target.value,
                }))
            }}/></Col>
        </Row>
    )
}

export default EmailField
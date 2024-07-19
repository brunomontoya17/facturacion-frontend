import { useContext } from 'react'
import { ClieProvContext } from '../ClieProvContext'
import { Row, Col } from "react-bootstrap";

function TypePersField(props) {
    const [clieprov,setClieprov, ,
        , , ,typesPersoneria]= useContext(ClieProvContext);

    return (
        <Row>
            <Col><label htmlFor="type">Tipo Persona</label></Col>
            <Col><select id='type' value={clieprov.type} disabled={!props.active}
            onChange={(e) => {
                setClieprov(({
                    ...clieprov,
                    type:e.target.value,
                }))
            }}>
                <option value={typesPersoneria.fisica}>
                    Persona Fisica
                </option>
                <option value={typesPersoneria.juridica}>
                    Persona Juridica
                </option>
            </select></Col>
        </Row>
    )
}

export default TypePersField
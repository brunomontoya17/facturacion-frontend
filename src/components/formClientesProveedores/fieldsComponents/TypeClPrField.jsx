import React, { useContext } from 'react'
import { ClieProvContext } from '../ClieProvContext'
import { Row, Col } from "react-bootstrap";

function TypeClPrField(props) {
    const [clieprov,setClieprov,EmptyClieProv,
        typeclpr,setTypeclpr,typesClieProv] = useContext(ClieProvContext);

    return (
        <Row>
            <Col><label htmlFor="entity">Tipo Entidad</label></Col>
            <Col><select id='entity' value={typeclpr} disabled={!props.active}
                onChange={(e) => {
                    setTypeclpr(e.target.value);
                }}>
                <option value={typesClieProv.cliente}>
                {typesClieProv.cliente}
                </option>
                <option value={typesClieProv.proveedor}>
                {typesClieProv.proveedor}
                </option>
                <option value={typesClieProv.clieprov}>
                {typesClieProv.clieprov}
                </option>
            </select></Col>
        </Row>
    )
}

export default TypeClPrField
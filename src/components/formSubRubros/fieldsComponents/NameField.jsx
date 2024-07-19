import React, { useContext } from 'react'
import { SubRubroContext } from '../SubRubroContext'
import { Row, Col } from 'react-bootstrap'

function NameField() {

    const [subrubro,setSubrubro,rubros,EmptySubRubro] = useContext(SubRubroContext)
    return (
        <Row>
            <Col><label htmlFor="name">Nombre SubRubro:</label></Col>
            <Col><input type='text' id='name' value={subrubro.nombreSubRubro}
                onChange={
                    (e) => {
                        setSubrubro(({
                            ...subrubro,
                            nombreSubRubro: e.target.value
                        }))
                    }
                } /></Col>
        </Row>
    )
}

export default NameField
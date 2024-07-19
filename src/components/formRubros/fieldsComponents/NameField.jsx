import React, { useContext } from 'react'
import { RubroContext } from '../RubroContext'
import { Row, Col } from 'react-bootstrap'

function NameField() {

    const [rubro,setRubro,EmptyRubro] = useContext(RubroContext);

  return (
    <Row>
        <Col><label htmlFor="name">Nombre Rubro:</label></Col>
        <Col><input type='text' id='name' value={rubro.nombreRubro}
                onChange={
                    (e) => {
                        setRubro(({
                            ...rubro,
                            nombreRubro:e.target.value
                        }))
                    }
                }/></Col>
    </Row>
  )
}

export default NameField
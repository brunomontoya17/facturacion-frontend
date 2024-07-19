import React, { useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import { RubroContext } from '../RubroContext'

function DescField() {

    const [rubro,setRubro,EmptyRubro] = useContext(RubroContext);

  return (
    <Row>
        <Col><label htmlFor="desc">Descripcion:</label></Col>
        <Col><textarea id='desc' className='form-control' cols='128' rows={3} 
                value={rubro.descripcion} onChange={
                    (e) => {
                         setRubro(({
                            ...rubro,
                            descripcion:e.target.value
                        }))
                    }
                }/></Col>
    </Row>
  )
}

export default DescField
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useContext } from 'react';
import { SubRubroContext } from '../SubRubroContext';

function DescField() {

    const [subrubro,setSubrubro,rubros,EmptySubRubro] = useContext(SubRubroContext);
    return (
        <Row>
            <Col><label htmlFor="desc">Descripcion:</label></Col>
            <Col><textarea id='desc' className='form-control' cols='128' rows={3}
                value={subrubro.descripcion} onChange={
                    (e) => {
                        setSubrubro(({
                            ...subrubro,
                            descripcion: e.target.value
                        }))
                    }
                } /></Col>
        </Row>
    )
}

export default DescField
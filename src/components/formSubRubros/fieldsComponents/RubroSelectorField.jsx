import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useContext } from 'react';
import { SubRubroContext } from '../SubRubroContext';

function RubroSelectorField() {
    const [subrubro,setSubrubro,rubros,EmptySubRubro] = useContext(SubRubroContext);
    return (
        <Row>
            <Col><label htmlFor="selRubro">Rubro:</label>
            </Col>
            <Col>
                <select id="selRubro" className='form-select' value={JSON.stringify(subrubro.rubroPadre)} onChange={
                    (e) => {
                        setSubrubro(({
                            ...subrubro,
                            rubroPadre: JSON.parse(e.target.value)
                        }))
                    }
                }>
                    {
                        rubros.map((rubro) => {
                            return (
                                <option key={rubro.idRubro} value={JSON.stringify(rubro)}>{rubro.nombreRubro}</option>
                            )
                        })
                    }
                </select>
            </Col>
        </Row>
    )
}

export default RubroSelectorField
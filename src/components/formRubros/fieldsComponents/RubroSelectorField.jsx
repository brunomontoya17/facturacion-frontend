import React, { useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { useContext } from 'react';

import { RubroContext } from '../RubroContext';

function RubroSelectorField() {
    const [rubro, setRubro, EmptyRubro, listRubros, changedList, setChangedList] = useContext(RubroContext);

    const [filteredList, setFilteredList] = useState([]);

    const sinSubrubro = new EmptyRubro();

    useEffect(() => {
        const filter = listRubros.filter((rub) => rub.nivelRubro < 5 && rub.idRubro != rubro.idRubro);
        console.log(filter);
        setFilteredList(filter);
    }, [listRubros, rubro])


    const writeJerarquia = (rub) => {
        let jerarquia = [];
        if (rub!=null){
            jerarquia.unshift(rub.nombreRubro);
            let next = rub;
            while (next.rubroPadre!=null) {
                jerarquia.unshift(next.rubroPadre.nombreRubro);
                next = next.rubroPadre;
            }
        }
        return (<ol>
            {jerarquia.map( (el,index) => <li key={index+1}>{el}</li>)}
        </ol>);
    }

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col>{(writeJerarquia((rubro.rubroPadre)))}</Col>
            </Row>
            <Row>
                <Col><label htmlFor="selRubro">Rubro:</label>
                </Col>
                <Col>
                    <select id="selRubro" className='form-select' value={JSON.stringify(rubro.rubroPadre)} onChange={
                        (e) => {
                            setRubro(({
                                ...rubro,
                                rubroPadre: JSON.parse(e.target.value)
                            }))
                        }
                    }>
                        <option key={0} value={JSON.stringify(sinSubrubro)}>Sin subrubro</option>
                        {
                            filteredList.map((rub) => {
                                return (
                                    <option key={rub.idRubro} value={JSON.stringify(rub)}>{rub.nombreRubro}</option>
                                )
                            })
                        }
                    </select>
                </Col>
            </Row>
        </Container>

    )
}

export default RubroSelectorField
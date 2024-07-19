import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormBaseSubRubros from './FormBaseSubRubros';
import SubRubroService from '../../services/SubRubroService';
import { Behavior } from '../../logics/config';

function FormAddSubRubro()
{
    function EmptySubRubro()
    {
        this.idSubRubro=0;
        this.nombreSubRubro = '';
        this.descripcion = '';
        this.rubroPadre = {
            nombreRubro:'',
            descripcion:''
        };
    }

    const [subrubro,setSubrubro] = useState(new EmptySubRubro());
    const navigate = useNavigate();

    const agregarSubRubro = (e) => {
        e.preventDefault();
        SubRubroService.addSubRubro(subrubro).then((response) =>
        {
            console.log(response.data);
            navigate('/subrubros');
        }).catch( error => console.log(error) );
    }

    return (
        <Container>
            <form onSubmit={agregarSubRubro}>
                <h2>Agregar SubRubro</h2>
                <FormBaseSubRubros behavior={Behavior.agregar} subrubro={subrubro} setSubrubro={setSubrubro}/>
                <Row>
                    <Col><label htmlFor='addSubRubro'>Agregar SubRubro:</label></Col>
                    <Col><input id="addSubRubro "type="submit" value={"Agregar SubRubro"} /></Col>
                </Row>
            </form>
        </Container>
    )
}

export default FormAddSubRubro;
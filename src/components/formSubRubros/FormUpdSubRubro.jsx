import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormBaseSubRubros from './FormBaseSubRubros';
import SubRubroService from '../../services/SubRubroService';

function FormUpdSubRubro ()
{
    function EmptySubRubro()
    {
        this.nombreSubRubro = '';
        this.descripcion = '';
        this.rubroPadre = {
            nombreRubro:'',
            descripcion:''
        };
    }

    const [subrubro,setSubrubro] = useState(new EmptySubRubro());
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        SubRubroService.getSubRubroByID(id).then((response) =>
        {
            setSubrubro(response.data);
            console.log(response.data);
        }).catch(error => console.log(error));
    }, [])

    const modificarSubRubro = (e) => {
        e.preventDefault();
        SubRubroService.updateSubRubro(subrubro).then((response) =>
        {
            console.log(response.data);
            navigate("/subrubros");
        }).catch( error => console.log(error) );
    }

    return (
        <Container>
            <form onSubmit={modificarSubRubro}>
                <h2>Modificar SubRubro</h2>
                <FormBaseSubRubros  subrubro={subrubro} setSubrubro={setSubrubro}/>
                <Row>
                    <Col><label htmlFor='updSubRubro'>Modificar SubRubro:</label></Col>
                    <Col><input id="updSubRubro "type="submit" value={"Modificar SubRubro"} /></Col>
                </Row>
            </form>
        </Container>
    )
}

export default FormUpdSubRubro;
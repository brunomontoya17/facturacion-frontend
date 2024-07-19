import { Container, Row, Col } from 'react-bootstrap';

import { useState } from 'react';
import FormBaseMarcas from './FormBaseMarcas';
import { useNavigate } from 'react-router-dom';
import MarcaService from '../../services/MarcaService';

function FormAddMarca() {
    function EmptyMarca()
    {
        this.nombreMarca = '';
        this.descripcion = '';
    }

    const [marca,setMarca] = useState(new EmptyMarca());
    const navigate = useNavigate();

    const agregarMarca = (e) => {
        e.preventDefault();
        MarcaService.addMarca(marca).then((response) =>
        {
            console.log(response.data);
            navigate('/marcas');
        }).catch( error => console.log(error) );
    }

    return (
        <Container>
            <form onSubmit={agregarMarca}>
                <h2>Agregar Marca</h2>
                <FormBaseMarcas marca={marca} setMarca={setMarca} />
                <Row>
                    <Col><label htmlFor='addMarca'>Agregar Marca:</label></Col>
                    <Col><input id="addMarca "type="submit" value={"Agregar Marca"} /></Col>
                </Row>
            </form>
        </Container>
    )
}

export default FormAddMarca;
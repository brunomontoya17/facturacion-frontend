import { useContext } from 'react'
import { MarcaContext } from '../MarcaContext'
import { Container, Row, Col } from 'react-bootstrap';

function NameField() {
    const [marca,setMarca,EmptyMarca] = useContext(MarcaContext);
    return (
        <Row>
            <Col><label htmlFor="name">Nombre Marca:</label></Col>
            <Col><input type='text' id='name' value={marca.nombreMarca}
                onChange={
                    (e) => {
                        setMarca(({
                            ...marca,
                            nombreMarca: e.target.value
                        }))
                    }
                } /></Col>
        </Row>
    )
}

export default NameField
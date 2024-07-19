import { useContext } from 'react'
import { MarcaContext } from '../MarcaContext'
import { Container, Row, Col } from 'react-bootstrap';



function DescField() {
    const [marca,setMarca,EmptyMarca] = useContext(MarcaContext);
    return (
        <Row>
            <Col><label htmlFor="desc">Descripcion:</label></Col>
            <Col><textarea id='desc' className='form-control' cols='128' rows={3}
                value={marca.descripcion} onChange={
                    (e) => {
                        setMarca(({
                            ...marca,
                            descripcion: e.target.value
                        }))
                    }
                } /></Col>
        </Row>
    )
}

export default DescField
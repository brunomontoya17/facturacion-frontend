import { Row, Col } from "react-bootstrap"
import { useContext } from "react";
import { ProductoContext } from "../ProductoContext";

function DescField() {

    const [producto, setProducto] = [ ...useContext(ProductoContext) ];
    return (
        <Row>
            <Col><label htmlFor="desc">Descripcion:</label></Col>
            <Col><textarea id='desc' className='form-control' cols='128' rows={3}
                value={producto.descripcion} onChange={
                    (e) => {
                        setProducto(({
                            ...producto,
                            descripcion: e.target.value
                        }))
                    }
                } /></Col>
        </Row>
    )
}

export default DescField
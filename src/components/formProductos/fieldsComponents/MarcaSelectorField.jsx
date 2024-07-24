import { Row, Col } from "react-bootstrap"
import { useContext } from "react";
import { ProductoContext } from "../ProductoContext";

function MarcaSelectorField() {

    const [producto, setProducto, EmptyProducto,
        rubros, marcas, manejoStock, setManejoStock, 
        EmptyMarca, EmptyPlanilla, lastAddSelectedRubro, lastAddSelectedMarca] = [...useContext(ProductoContext)];

    const marcaField = [new EmptyMarca(),...marcas]
    return (
        <Row>
            <Col><label htmlFor="selMarca">Marca:</label></Col>
            <Col><select id='selMarca' className='form-select' 
            value={JSON.stringify(producto.marca)}
                onChange={(e) => {
                    setProducto(({
                        ...producto,
                        marca: JSON.parse(e.target.value)
                    }));
                }} >{
                    marcaField.map((marca) => {
                        return (
                            <option key={marca.idMarca} 
                            value={JSON.stringify(marca)}>{marca.nombreMarca}</option>
                        )
                    })
                }
            </select></Col>
        </Row>
    )
}

export default MarcaSelectorField
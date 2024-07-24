import { Row, Col } from "react-bootstrap"
import { useContext } from "react";
import { ProductoContext } from "../ProductoContext";

function RubroSelectorField() {

    const [producto, setProducto, EmptyProducto,
        rubros, marcas, manejoStock, setManejoStock, 
        EmptyMarca, EmptyPlanilla, lastAddSelectedRubro, lastAddSelectedMarca] = [...useContext(ProductoContext)];
    return (
        <Row>
            <Col><label htmlFor="selRubro">Rubro:</label></Col>
            <Col><select id="selRubro" className='form-select' 
            value={JSON.stringify(producto.rubro)} 
            onChange={
                (e) => {
                    setProducto(({
                        ...producto,
                        rubro: JSON.parse(e.target.value)
                    }));
                }
            }>
                {
                    rubros.map((rubro) => {
                        return (
                            <option key={rubro.idRubro} value={JSON.stringify(rubro)}>
                                {rubro.nombreRubro}</option>
                        )
                    })
                }
            </select></Col>
        </Row>
    )
}

export default RubroSelectorField
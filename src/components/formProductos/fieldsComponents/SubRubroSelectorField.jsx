import { Row, Col } from "react-bootstrap"
import { useContext } from "react";
import { ProductoContext } from "../ProductoContext";

function SubRubroSelectorField() {

    const [producto, setProducto, EmptyProducto,
        rubros, subrubros, marcas,
        subrubroField, setSubrubroField,
        manejoStock, setManejoStock, 
        EmptySubRubro, EmptyMarca, EmptyPlanilla,
        lastAddSelectedRubro, lastAddSelectedMarca] = [...useContext(ProductoContext)];
    return (
        <Row>
            <Col><label htmlFor="selSubRubro">SubRubro:</label></Col>
            <Col><select id="selSubRubro" className='form-select' 
            value={JSON.stringify(producto.subRubro)}
                onChange={(e) => {
                    setProducto(({
                        ...producto,
                        subRubro: JSON.parse(e.target.value)
                    }));

                }
                }>
                {
                    subrubroField.map((subRubro) => {
                        return (
                            <option key={subRubro.idSubRubro} 
                            value={JSON.stringify(subRubro)}>{subRubro.nombreSubRubro}</option>
                        )
                    })
                }
            </select></Col>
        </Row>
    )
}

export default SubRubroSelectorField
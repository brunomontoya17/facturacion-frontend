import { Row, Col } from "react-bootstrap"
import { useContext } from "react";
import { ProductoContext } from "../ProductoContext";

function ProveedorSelectorField() {

    const [producto, setProducto, ,
        , , , proveedores,
        , , ,
        , , ] = [...useContext(ProductoContext)];
    
    function EmptyProveedor(){
        this.idProveedor= 0
        this.type= ''
        this.email=''
        this.telefono=''
        this.direccion=''
        this.deAlta=true
        this.nombreCompleto='Sin Proveedor'
        this.cuilDNI=''
    }

    const proveedorField = [new EmptyProveedor(),...proveedores]
    return (
        <Row>
            <Col><label htmlFor="selProveedor">Proveedor:</label></Col>
            <Col><select id='selProveedor' className='form-select' 
            value={JSON.stringify(producto.proveedor)}
                onChange={(e) => {
                    setProducto(({
                        ...producto,
                        proveedor: JSON.parse(e.target.value)
                    }));
                }} >{
                    proveedorField.map((proveedor) => {
                        return (
                            <option key={proveedor.idProveedor} 
                            value={JSON.stringify(proveedor)}>{proveedor.nombreCompleto}</option>
                        )
                    })
                }
            </select></Col>
        </Row>
    )
}

export default ProveedorSelectorField
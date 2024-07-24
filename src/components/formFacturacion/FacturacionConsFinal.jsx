import React, { useEffect, useState, useRef } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import ProductoService from '../../services/ProductoService';
import FacturacionService from '../../services/FacturacionService'
import RowItem from './RowItem';
import { act } from 'react';
import { useNavigate } from 'react-router-dom';

function FacturacionConsFinal() {
    const ConsumidorFinal = {
        idCliente: -1,
        nombreCompleto: 'Consumidor Final',
        cuilDNI: 'xx-XXXXXXXX-x',
        direccion: 'Calle Sin Nombre S/N',
        telefono: 'XX-YYYY-ZZZZ',
        email: 'consumidor@final.net',
        deAlta: true,
    }

    const FacturaAEmitir = {
        fecha: null,
        cliente: null,
        items: [],
    }
    const ItemVacio = {
        id: 0,
        producto: null,
        codigoDeBarras: '',
        nombreProducto: '',
        precio: 0.0,
        cantidad: 0.0,
    }

    const navigate = useNavigate();
    const billDate = new Date().toLocaleString();
    const iditem = useRef(0);
    const [emptyItem, setEmptyItem] = useState(ItemVacio)

    const [activeRun, setActiveRun] = useState(false)
    const [rows, setRows] = useState([]);
    const [items, setItems] = useState([]);
    const firstRun = useRef(true);
    const secondRun = useRef(true);
    const [prod, setProd] = useState({});
    const [total,setTotal] = useState(0);
    //const repeatedBarcode = useRef(false);
    
    //const equalities = useRef(0);

    /*
const onChangeInput = (e, employeeId) => {
  const { name, value } = e.target
  console.log('name', name)
  console.log('value', value)
  console.log('employeeId', employeeId)

  const editData = employeeData.map((item) =>
    item.employeeId === employeeId && name ? { ...item, [name]: value } : item
  )

  console.log('editData', editData)

  setEmployeeData(editData)
}




*/

    useEffect(() => {
        const controller = new AbortController();
        if (activeRun) {
            console.log("Entrada Al UE");
            ProductoService.getProductoByBarcode(emptyItem.codigoDeBarras, controller).then
                ((response) => {
                    setProd(response.data);
                }).catch
                (error => console.log(error));
        }
        return () => controller.abort()
    }, [activeRun])

    useEffect(() => {
        if (activeRun) {
            const founded = items.some((it) => {
                console.log(it);
                return it.rowItem.codigoDeBarras === prod.codigoDeBarras
            })
            if (!founded) {
                iditem.current += 1;
                const newRow = (<RowItem key={iditem.current} itemid={iditem.current} producto={prod} items={items} setItems={setItems} />)
                setRows([...rows, newRow]);
                
            }
            else {
                console.log(items);
                let index = items.findIndex((it) => {
                    return prod.codigoDeBarras === it.rowItem.codigoDeBarras;
                });

                const itemchange = items[index].rowItem;

                const amount = itemchange.cantidad + 1;

                const setItemchange = items[index].setRowItem;
                setItemchange(({
                    ...itemchange,
                    cantidad: amount,
                }))

               
            }
            
            setActiveRun(false);
        }
    }, [prod])

    useEffect (() => {
        if(items.length>0){
            setTotal(items.reduce((acumulador,it) => acumulador+=it.rowItem.cantidad*it.rowItem.precio,0))
        }
    },[items])

    const handleChange = (e) => {
        setEmptyItem(({
            ...emptyItem,
            codigoDeBarras: e.target.value,
        }))
    }
    const leerBarCode = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setActiveRun(true);
        }
        /*
        setEmptyItem(({
            ...emptyItem,
            codigoDeBarras: e.target.value,
        }))
        e.stopPropagation();*/
    }

    const emitirFactura = (e) => {
        e.preventDefault();
        const itemsFinales = items.map((it) => {
            return ({
                ...(it.rowItem),
            })
        })
        console.log(itemsFinales);
        FacturaAEmitir.items = itemsFinales;
        FacturacionService.generateFactura(FacturaAEmitir).then
        (response => console.log(response)).catch
        (error => console.log(error));
        navigate("/");
    }

    return (
        <Container>
            <Row>
                <h2>Facturacion a {ConsumidorFinal.nombreCompleto}</h2>
            </Row>
            <Container>
                <Row>
                    <Col>Fecha: {billDate}</Col>
                    <Col>Nombre Completo: {ConsumidorFinal.nombreCompleto}</Col>
                    <Col>Cuil/Cuit/Dni: {ConsumidorFinal.cuilDNI}</Col>
                </Row>
                <Row>
                    <Col>Direccion: {ConsumidorFinal.direccion}</Col>
                    <Col>Telefono: {ConsumidorFinal.telefono}</Col>
                    <Col>Email: {ConsumidorFinal.email}</Col>
                </Row>
            </Container>
            <Container>
                <form onSubmit={emitirFactura}> 

                
                <Table>
                    <thead>
                        <tr>
                            <th>Codigo:</th>
                            <th>Cantidad:</th>
                            <th>Detalle:</th>
                            <th>Precio unitario:</th>
                            <th>Subtotal:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.map((row) => row)
                        }
                        <tr key={emptyItem.id}>
                            <td><input id={`barcode-add`} type="text" value={emptyItem.codigoDeBarras} onChange={handleChange} onKeyDown={leerBarCode} /></td>
                            <td><input id={`quantity-add`} type="number" value={''} readOnly /></td>
                            <td><input id={`detail-add`} type="text" value={''} readOnly /></td>
                            <td><input id={`price-add`} type="number" value={0} readOnly /></td>
                            <td><input id={`subtotal-add`} type="text" value={''} readOnly /></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Importe total:</td>
                            <td>{total}</td>
                        </tr>
                    </tfoot>
                </Table>
                <button id="genBill" type='submit'>Crear Factura</button>
                </form>
            </Container>
        </Container>
    )
}

export default FacturacionConsFinal
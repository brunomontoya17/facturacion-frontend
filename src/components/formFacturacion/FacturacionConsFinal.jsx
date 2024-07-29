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
    const [items, setItems] = useState([]);

    const [prod, setProd] = useState({});
    const [total, setTotal] = useState(0);

    function crearItem(itemid, producto, codigoDeBarras, nombreProducto, precio) {
        this.id = itemid;
        this.producto = producto;
        this.codigoDeBarras = codigoDeBarras;
        this.cantidad = 1;
        this.nombreProducto = nombreProducto;
        this.precio = precio;
    }


    const onChangeInput = (e, itemid) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log('name', name);
        console.log('value', value);
        const editData = items.map((it) =>
            it.id === itemid && name ? { ...it, [name]: value } : it
        );
        setItems(editData);
    }






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
                return it.codigoDeBarras === prod.codigoDeBarras
            })
            if (!founded) {
                iditem.current += 1;
                const itemadd = new crearItem(iditem.current, prod, prod.codigoDeBarras, prod.nombreProducto, prod.precio);
                setItems([...items, itemadd]);
            }
            else {
                let index = items.findIndex((it) => {
                    return prod.codigoDeBarras === it.codigoDeBarras;
                });
                const itemchange = items[index];
                itemchange.cantidad += 1;
                setItems([...items]);
            }
            setActiveRun(false);
        }
    }, [prod])

    useEffect(() => {
        if (items.length > 0) {
            setTotal(items.reduce((acumulador, it) => acumulador += it.cantidad * it.precio, 0))
        }
    }, [items])

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
        console.log(items);
        FacturaAEmitir.items = items;
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
                                items.map((it) => {
                                    return (<tr key={it.id}>
                                        <td><input id={`barcode-${it.id}`} name='codigoDeBarras' type="text" value={it.codigoDeBarras} readOnly /></td>
                                        <td><input id={`quantity-${it.id}`} name='cantidad' type="number" value={it.cantidad} onChange={(e) => {
                                            onChangeInput(e, it.id);
                                        }} /></td>
                                        <td><input id={`detail-${it.id}`} name='nombreProducto' type="text" value={it.nombreProducto} readOnly /></td>
                                        <td><input id={`price-${it.id}`} name='precio' type="number" value={it.precio} onChange={(e) => {
                                            onChangeInput(e, it.id);
                                        }} /></td>
                                        <td><input id={`subtotal-${it.id}`} name='subtotal' type="text" value={it.cantidad * it.precio} readOnly /></td>
                                    </tr>)
                                })
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
import React, { useEffect, useState, useRef } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import ProductoService from '../../services/ProductoService';
import FacturacionService from '../../services/FacturacionService'
import ClienteService from '../../services/ClienteService';
import { useNavigate } from 'react-router-dom';
import { BillBhvr } from '../../logics/config';

function FacturacionConsFinal(props) {
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
    
    const [emptyItem, setEmptyItem] = useState(ItemVacio)

    const [activeRun, setActiveRun] = useState(false)
    const [items, setItems] = useState([]);

    const iditem = useRef(0);
    const [prod, setProd] = useState({});
    const [total, setTotal] = useState(0);

    const [cliente, setCliente] = useState({});
    const [listadoClientes, setListadoClientes] = useState([]);
    const [idFactNueva, setIdFactNueva] = useState(0);
    const [exitForm, setExitForm] = useState(false);

    function crearItem(itemid, producto, codigoDeBarras, nombreProducto, precio) {
        this.id = itemid;
        this.producto = producto;
        this.codigoDeBarras = codigoDeBarras;
        this.cantidad = 1;
        this.nombreProducto = nombreProducto;
        this.precio = precio;
    }


    const onChangeInput = (e, itemid) => {
        const { name, value } = e.target;
        console.log('name', name);
        console.log('value', value);
        const editData = items.map((it) =>
            it.id === itemid && name ? { ...it, [name]: value } : it
        );
        setItems(editData);
    }
 
    const deleteItem = (itemid) => {
        const editData = items.filter( it => it.id !== itemid);
        setItems(editData);
    }


    useEffect(() => {
        const controller = new AbortController();
        if (props.behavior == BillBhvr.cliente) {
            ClienteService.getClientes(controller).then
                ((response) => {
                    const listado = response.data.map((clie) => {
                        if (clie.deAlta)
                            return clie;
                    });
                    setListadoClientes(listado);
                    setCliente(listado[0]);
                }).catch
                (error => console.log(error));
        }
        else {
            setCliente(ConsumidorFinal);
        }

        return () => controller.abort();
    }, [props.behavior])


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
    }

    const emitirFactura = (e) => {
        e.preventDefault();
        console.log(items);
        FacturaAEmitir.items = items;
        if (props.behavior == BillBhvr.cliente) {
            FacturaAEmitir.cliente = cliente;
        } 
        FacturacionService.generateFactura(FacturaAEmitir).then
            (response => {
                setExitForm(true);
                setIdFactNueva(response.data);
            }).catch
            (error => console.log(error));
    }

    useEffect (() => {
        if (exitForm)
            navigate(`/ver-facturas/${idFactNueva}`);
    },[idFactNueva])

    return (
        <Container>
            <Row>
                <Col><h2>Facturacion a {cliente.nombreCompleto}</h2></Col>
                { props.behavior == BillBhvr.cliente ? <Col><label htmlFor='sel-cliente'>Elige cliente:</label><select id="sel-cliente" className='form-select' value={JSON.stringify(cliente)}
                        onChange={(e) => {
                            setCliente(JSON.parse(e.target.value));
                        }}>
                            {
                                listadoClientes.map((clie) => {
                                    return <option key={clie.idCliente} value={JSON.stringify(clie)}>{clie.nombreCompleto}</option>
                                })
                            }
                    </select></Col> : <></> }
                
            </Row>
            <Container>
                <Row>
                    <Col>Fecha: {billDate}</Col>
                    <Col>Nombre Completo: {cliente.nombreCompleto}</Col>
                    <Col>Cuil/Cuit/Dni: {cliente.cuilDNI}</Col>
                </Row>
                <Row>
                    <Col>Direccion: {cliente.direccion}</Col>
                    <Col>Telefono: {cliente.telefono}</Col>
                    <Col>Email: {cliente.email}</Col>
                </Row>
            </Container>
            <Container>
                <form onSubmit={emitirFactura}>
                    <Table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Codigo:</th>
                                <th>Cantidad:</th>
                                <th>Detalle:</th>
                                <th>Precio unitario:</th>
                                <th>Subtotal:</th>
                                <td>Borrar Item:</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((it) => {
                                    return (<tr key={it.id}>
                                        <td><input id={`barcode-${it.id}`} name='codigoDeBarras' type="text" value={it.codigoDeBarras} readOnly /></td>
                                        <td><input id={`quantity-${it.id}`} name='cantidad' type="number" value={it.cantidad}
                                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                                            onChange={(e) => {
                                                onChangeInput(e, it.id);
                                            }} /></td>
                                        <td><input id={`detail-${it.id}`} name='nombreProducto' type="text" value={it.nombreProducto} readOnly /></td>
                                        <td><input id={`price-${it.id}`} name='precio' type="number" value={it.precio}
                                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                                            onChange={(e) => {
                                                onChangeInput(e, it.id);
                                            }} /></td>
                                        <td><input id={`subtotal-${it.id}`} name='subtotal' type="text" value={it.cantidad * it.precio} readOnly /></td>
                                        <td><button id={`delete-${it.id}`} onClick={() => {
                                            deleteItem(it.id);
                                        }}>Borrar</button></td>
                                    </tr>)
                                })
                            }
                            <tr key={emptyItem.id}>
                                <td><input id={`barcode-add`} type="text" value={emptyItem.codigoDeBarras} onChange={handleChange} onKeyDown={leerBarCode} /></td>
                                <td><input id={`quantity-add`} type="number" value={''} readOnly /></td>
                                <td><input id={`detail-add`} type="text" value={''} readOnly /></td>
                                <td><input id={`price-add`} type="number" value={0} readOnly /></td>
                                <td><input id={`subtotal-add`} type="text" value={''} readOnly /></td>
                                <td></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Importe total:</td>
                                <td>{total}</td>
                                <td></td>
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
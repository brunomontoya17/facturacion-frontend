import React, { useEffect, useState, useRef } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import ProductoService from '../../services/ProductoService';
import ProveedorService from '../../services/ProveedorService';
import EySdeStockService from '../../services/EySdeStockService';
import { act } from 'react';

function EntradaStock() {

    const EntradaAEmitir = {
        fecha_entrada: null,
        proveedor: null,
        items: [],
        margenes: [],
    }

    const ItemVacio = {
        id: 0,
        producto: null,
        codigoDeBarras: '',
        nombreProducto: '',
        precio_costo: 0.0,
        cantidad: 0.0,
        codigoprodprov: {
            producto: null,
            proveedor: null,
            codigo_proveedor: '',
        },
    }

    function crearItem(itemid, producto, codigoDeBarras, nombreProducto, codigoprodprov) {
        this.id = itemid;
        this.producto = producto;
        this.codigoDeBarras = codigoDeBarras;
        this.cantidad = 1;
        this.nombreProducto = nombreProducto;
        this.precio_costo = 0.0;
        this.codigoprodprov = codigoprodprov;
    }

    const navigate = useNavigate();
    const InputDate = new Date().toLocaleString();

    const [emptyItem, setEmptyItem] = useState(ItemVacio)

    const [activeRun, setActiveRun] = useState(false)
    const [codprovRun, setCodprovRun] = useState(false);
    const [items, setItems] = useState([]);
    const iditem = useRef(0);
    const [prod, setProd] = useState(null);
    const [codprodprov, setCodprodprov] = useState(null);
    const [total, setTotal] = useState(0);

    const [proveedor, setProveedor] = useState(null);
    const [listadoProveedores, setListadoProveedores] = useState([]);
    const [idEntradaNueva, setIdEntradaNueva] = useState(0);
    const [exitForm, setExitForm] = useState(false);


    // Proveedores
    useEffect(() => {
        const controller = new AbortController();
        ProveedorService.getProveedores(controller).then(
            (response) => {
                const listado = response.data.map((prov) => {
                    if (prov.deAlta)
                        return prov;
                });
                setListadoProveedores(listado);
                setProveedor(listado[0]);
            }).catch
            (error => console.log(error));
        return () => controller.abort();
    }, [])

    //CargarItem Primera parte
    /* Esta serie de useEffect se encargan de traer los productos desde el backend SpringBoot y primero traen el 
    producto a ingresar a stock, despues busca en la base de datos si ya tiene un codigo asociado al proveedor
    seleccionado (Aclaracion: tengo que hacer una funcion que recargue todos los codigos si se cambia de proveedor en el
    proceso de carga de stock) por ultimo, se fija en el array items_setItems si ya esta cargado el producto y lo agrega
    o lo actualiza de acuerdo a su existencia o no. La cuarta parte actualiza el total de la factura de compra cargada. */
    useEffect(() => {
        const controller = new AbortController();
        if (activeRun) {
            console.log("--1--")
            ProductoService.getProductoByBarcode(emptyItem.codigoDeBarras, controller).then
                ((response) => {
                    setProd(response.data);
                }).catch
                (error => console.log(error));
        }
        return () => controller.abort();
    }, [activeRun])

    //CargarItem Segunda parte
    useEffect(() => {
        const controller = new AbortController();
        if (activeRun) {
            console.log("--2--");
            setCodprovRun(!codprovRun);
            ProductoService.getCodigoProdXProv(prod.idProducto, proveedor.idProveedor, controller).then
                ((response) => {
                    setCodprodprov(response.data);
                }).catch
                (error => console.log(error));
        }
        return () => controller.abort();
    }, [prod])

    //CargarItem TerceraParte
    useEffect(() => {
        if (activeRun) {
            console.log("--3--");
            const found = items.some((it) => {
                return it.codigoDeBarras == prod.codigoDeBarras;
            })
            if (!found) {
                iditem.current += 1;
                /* En esta parte se verifica si existe o no el producto en la tabla de ingreso de factura
                y tambien si tiene un codigo asociado o puede crear uno nuevo*/
                let codigo = {
                    id:0,
                    producto: prod,
                    proveedor: proveedor,
                    codigo_proveedor: '',
                }
                if (codprodprov !== '' && codprodprov !== null)
                    codigo = codprodprov;
                const itemadd = new crearItem(iditem.current, prod, prod.codigoDeBarras, prod.nombreProducto, codigo);
                console.log(itemadd);
                setItems([...items, itemadd]);
            } else {
                let index = items.findIndex((it) => {
                    return it.codigoDeBarras === prod.codigoDeBarras;
                });
                const itemchange = items[index];
                itemchange.cantidad += 1;
                setItems([...items]);
            }
            setActiveRun(false);
        }
    }, [codprodprov,codprovRun])

    //Renovar Totales 4ta Parte
    useEffect(() => {
        console.log(items);
        if (items.length > 0) {
            setTotal(items.reduce((acumulador, it) => acumulador += it.cantidad * it.precio_costo, 0))
        }
    }, [items])

    //Manejo de la fila vacia
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

    //Manejo de la tabla completa

    const onChangeInput = (e, itemid) => {
        const { name, value } = e.target;
        console.log('name', name);
        console.log('value', value);
        const editData = items.map((it) =>
            it.id === itemid && name ? name=="codigoprodprov" ? {...it,[name]:{...it[name],codigo_proveedor:value}} : { ...it, [name]: value } : it
        );
        setItems(editData);
    }

    const deleteItem = (itemid) => {
        const editData = items.filter(it => it.id !== itemid);
        setItems(editData);
    }

    const ingresarEntrada = (e) => {
        /*
         Esta es la funcion que se encarga de persistir la factura de entrada con los codigos de proveedor que
         provee el usuario*/
        e.preventDefault();
        console.table(items);
        EntradaAEmitir.items = items;
        const listaCodigos = items.map( it => it.codigoprodprov )
        console.table(listaCodigos);
        EntradaAEmitir.proveedor = proveedor;
        EntradaAEmitir.margenes = [21, 50];
        
        ProductoService.addProviderCodesList(listaCodigos).then
        (response => console.log(response)).catch
        (error => console.log(error));
        EySdeStockService.generateInput(EntradaAEmitir).then
            ((response) => console.log(response)).catch
            (error => console.log(error));
        navigate("/");
    }


    return (
        <Container>
            <Container>
                { proveedor && <>
                <Row>
                <Col><h2>Entrada de Stock de {proveedor.nombreCompleto}</h2></Col>
                <Col><label htmlFor='sel-proveedor'>Elige proveedor:</label><select id="sel-proveedor" className='form-select' value={JSON.stringify(proveedor)}
                    onChange={(e) => {
                        setProveedor(JSON.parse(e.target.value));
                        //Recargar codigos de productos por proveedor;
                    }}>
                    {
                        listadoProveedores.map((prov) => {
                            return <option key={prov.idProveedor} value={JSON.stringify(prov)}>{prov.nombreCompleto}</option>
                        })
                    }
                </select></Col>
            </Row>
            <Container>
                <Row>
                    <Col>Fecha: {InputDate}</Col>
                    <Col>Nombre Completo: {proveedor.nombreCompleto}</Col>
                    <Col>Cuil/Cuit/Dni: {proveedor.cuilDNI}</Col>
                </Row>
                <Row>
                    <Col>Direccion: {proveedor.direccion}</Col>
                    <Col>Telefono: {proveedor.telefono}</Col>
                    <Col>Email: {proveedor.email}</Col>
                </Row>
            </Container></>
                }
                
            </Container>

            <Container>
                Ingreso de margenes: por default: +21% +50%
            </Container>
            <Container>
                <form onSubmit={ingresarEntrada}>
                    <Table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Codigo de Barras:</th>
                                <th>Codigo de Proveedor:</th>
                                <th>Producto:</th>
                                <th>Cantidad:</th>
                                <th>Precio costo:</th>
                                <th>Subtotal:</th>
                                <td>Borrar Item:</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((it) => {
                                    return (<tr key={it.id}>
                                        <td><input id={`barcode-${it.id}`} name='codigoDeBarras' type="text" value={it.codigoDeBarras} readOnly /></td>
                                        <td><input id={`provcode-add`} name="codigoprodprov" type="text" value={it.codigoprodprov.codigo_proveedor} readOnly={it.codigoprodprov.id != 0}
                                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                                            onChange={(e) => {
                                                onChangeInput(e, it.id)
                                            }
                                            } /></td>
                                        <td><input id={`detail-${it.id}`} name='nombreProducto' type="text" value={it.nombreProducto} readOnly /></td>
                                        <td><input id={`quantity-${it.id}`} name='cantidad' type="number" value={it.cantidad}
                                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                                            onChange={(e) => {
                                                onChangeInput(e, it.id);
                                            }} /></td>

                                        <td><input id={`price-${it.id}`} name='precio_costo' type="number" value={it.precio_costo}
                                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                                            onChange={(e) => {
                                                onChangeInput(e, it.id);
                                            }} /></td>
                                        <td><input id={`subtotal-${it.id}`} name='subtotal' type="text" value={it.cantidad * it.precio_costo} readOnly /></td>
                                        <td><button id={`delete-${it.id}`} onClick={() =>{
                                            deleteItem(it.id);
                                        }} >Borrar</button></td>
                                    </tr>)
                                })
                            }
                            <tr key={emptyItem.id}>
                                <td><input id={`barcode-add`} type="text" value={emptyItem.codigoDeBarras} onChange={handleChange} onKeyDown={leerBarCode} /></td>
                                <td><input id={`provcode-add`} type="text" value={''} readOnly /></td>
                                <td><input id={`product-add`} type="text" value={''} readOnly /></td>
                                <td><input id={`quantity-add`} type="number" value={''} readOnly /></td>
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
                                <td></td>
                                <td>Importe total:</td>
                                <td>{total}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </Table>
                    <button id="genInput" type='submit'>Ingresar Stock de Productos</button>
                </form>
            </Container>
        </Container>
    )
}

export default EntradaStock
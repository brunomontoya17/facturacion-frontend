import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'

function RowItem(props) {
    const [rowIt, setRowIt] = useState({});
    const effectRan = useRef(false);
    const effectRan2 = useRef(true);

    function crearItem(itemid,producto,codigoDeBarras,nombreProducto,precio) {
        this.id = itemid;
        this.producto = producto;
        this.codigoDeBarras = codigoDeBarras;
        this.cantidad = 1;
        this.nombreProducto = nombreProducto;
        this.precio = precio;
    }

    useEffect(() =>
    {
        if (!effectRan.current) {
            effectRan2.current = false;
            setRowIt(new crearItem(props.itemid,
                props.producto,
                props.producto.codigoDeBarras,
                props.producto.nombreProducto,
                props.producto.precio));
        } 
        effectRan.current = true; 
    },[])

    useEffect(() => {
        if (rowIt!={})
        {
            console.log(rowIt);
            const rwIt = {
                rowItem: rowIt,
                setRowItem: setRowIt,
            }
            props.setItems([...props.items,rwIt]);
            console.log("Se cargaron los states!");
            effectRan2.current = true;
        }
    },[rowIt])

    return (
        <tr key={rowIt.id}>
            <td><input id={`barcode-${rowIt.id}`} type="text" value={rowIt.codigoDeBarras} readOnly /></td>
            <td><input id={`quantity-${rowIt.id}`} type="number" value={rowIt.cantidad} onChange={(e) => {
                setRowIt(({
                    ...rowIt,
                    cantidad:e.target.value,
                }))
            }} /></td>
            <td><input id={`detail-${rowIt.id}`} type="text" value={rowIt.nombreProducto} readOnly /></td>
            <td><input id={`price-${rowIt.id}`} type="number" value={rowIt.precio} onChange={(e) => {
                setRowIt(({
                    ...rowIt,
                    precio:e.target.value,
                }))
            }} /></td>
            <td><input id={`subtotal-${rowIt.id}`} type="text" value={rowIt.cantidad * rowIt.precio} readOnly /></td>
        </tr>
    )
}

export default RowItem
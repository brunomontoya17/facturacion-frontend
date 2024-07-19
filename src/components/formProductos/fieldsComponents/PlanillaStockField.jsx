import React, { useContext, useEffect, useState } from 'react'
import { ProductoContext } from '../ProductoContext';
import { Row, Col } from 'react-bootstrap';

function PlanillaStockField() {

    
    const [producto, setProducto, EmptyProducto,
        rubros, subrubros, marcas,
        subrubroField, setSubrubroField,
        manejoStock, setManejoStock, 
        EmptySubRubro, EmptyMarca, EmptyPlanilla,
        lastAddSelectedRubro, lastAddSelectedMarca] = [...useContext(ProductoContext)];


    const soloLectura = () => {
        return producto.planillaStock?.idPlanillaStock != 0;
    };
  return (
    <div>
        <Row>
            <Col><label htmlFor='manejoStock'>Maneja Stock:</label></Col>
            <Col><input id='manejoStock' type='checkbox' disabled={soloLectura()} checked={manejoStock} onChange={() => {
            setManejoStock(!manejoStock);
        }} /></Col>
        </Row>
        
        
        {
            manejoStock ? (() => { if(producto.planillaStock.idPlanillaStock==0)
                return (
                    <>
                    <Row>
                        <Col><label htmlFor='cantidad_stock'>Cantidad Inicial:</label></Col>
                        <Col><input id='cantidad_stock' type='number' min={0.0} step={1} value={producto.planillaStock?.cantidad_stock}
                    onChange={ (e) => {
                        setProducto({
                            ...producto,
                            planillaStock:{
                                ...producto.planillaStock,
                                cantidad_stock:e.target.value,
                                cantidad_ultima_entrada:e.target.value,
                                diferencia_ajuste:e.target.value,
                            }
                        })}
                    } /></Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor='cantidad_critica'>Cantidad Critica:</label></Col>
                        <Col><input id='cantidad_critica' type='number' min={0.0} step={1} value={producto.planillaStock?.cantidad_critica} 
                    onChange={ (e) => {
                        setProducto({
                            ...producto,
                            planillaStock:{
                                ...producto.planillaStock,
                                cantidad_critica:e.target.value,
                            }
                        })}
                    }
                    /></Col>
                    </Row>
                    </>
                )
            })() : <></>
        }
    </div>
  )
}

export default PlanillaStockField
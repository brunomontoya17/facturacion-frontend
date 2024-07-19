import React from 'react'
import { Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function PlanillaStockModal(props) {
    const planilla = props.producto?.planillaStock;
  return (
    <Container>
        <Modal show={props.show} onHide={props.closePlanilla}>
        <Modal.Header closeButton>
          <Modal.Title>{props.producto?.nombreProducto}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Table striped bordered hover size="sm">
                <tr>
                    <td>Cantidad actual:</td><td>{planilla?.cantidad_stock}</td>
                </tr>
                <tr>
                    <td>Cantidad critica:</td><td>{planilla?.cantidad_critica}</td>
                </tr>
                <tr>
                    <td>Ultima entrada:</td><td>{planilla?.fecha_ultima_entrada}</td>
                </tr>
                <tr>
                    <td>Cantidad entrada:</td><td>{planilla?.cantidad_ultima_entrada}</td>
                </tr>
                <tr>
                    <td>Ultima salida:</td><td>{planilla?.fecha_ultima_salida}</td>
                </tr>
                <tr>
                    <td>Cantidad salida:</td><td>{planilla?.cantidad_ultima_salida}</td>
                </tr>
                <tr>
                    <td>Ultimo ajuste:</td><td>{planilla?.fecha_ultimo_ajuste}</td>
                </tr>
                <tr>
                    <td>Ajuste:</td><td>{planilla?.diferencia_ajuste}</td>
                </tr>
                <tr>
                    <td>El Stock es critico:</td><td>{planilla?.isStockCritico ? 'Falta poco para agotarse' : 'El Stock es normal'}</td>
                </tr>
            </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.closePlanilla}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
    </Container>
  )
}

export default PlanillaStockModal
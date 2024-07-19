import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect } from 'react'
import { MarcaContext } from './MarcaContext';
import MarcaService from '../../services/MarcaService';
import { Behavior } from '../../logics/config';
import DescField from './fieldsComponents/DescField';
import NameField from './fieldsComponents/NameField';

function FormBaseMarcas(props) {
    const [marca, setMarca, EmptyMarca] = useContext(MarcaContext);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const controller = new AbortController();
        if (props.behavior == Behavior.agregar) {
            setMarca(new EmptyMarca());
        }
        if (props.behavior == Behavior.modificar) {
            MarcaService.getMarcaByID(id, controller).then
                (response => setMarca(response.data)).catch
                (error => console.log(error));
        }
        return () => controller.abort()
    }, [props.behavior])

    const agregarMarca = (e) => {
        e.preventDefault();
        MarcaService.addMarca(marca).then((response) => {
            console.log(response.data);
            navigate('/marcas');
        }).catch(error => console.log(error));
    }

    const modificarMarca = (e) => {
        e.preventDefault();
        MarcaService.updateMarca(marca).then((response) => {
            console.log(response.data);
            navigate('/marcas');
        }).catch(error => console.log(error));
    }

    return (
        <Container>
            <form onSubmit={(e) => {
                if (props.behavior == Behavior.agregar)
                    agregarMarca(e);
                if (props.behavior == Behavior.modificar)
                    modificarMarca(e);
            }}>
                {(() => {
                    if (props.behavior == Behavior.agregar)
                        return (<h2>Agregar Marca</h2>);
                    if (props.behavior == Behavior.modificar)
                        return (<h2>Modificar Marca</h2>);
                })()}
                <NameField />
                <DescField />
                {(() => {
                    if (props.behavior == Behavior.agregar)
                        return (<Row>
                            <Col><label htmlFor='addMarca'>Agregar Marca:</label></Col>
                            <Col><input id="addMarca " type="submit" value={"Agregar Marca"} /></Col>
                        </Row>);
                    if (props.behavior == Behavior.modificar)
                        return (<Row>
                            <Col><label htmlFor='updMarca'>Modificar Marca:</label></Col>
                            <Col><input id="updMarca " type="submit" value={"Modificar Marca"} /></Col>
                        </Row>);
                })()}
            </form>
        </Container>
    )
}

export default FormBaseMarcas;
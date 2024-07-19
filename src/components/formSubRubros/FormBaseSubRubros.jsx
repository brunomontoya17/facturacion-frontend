import { useEffect, useRef, useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Behavior } from '../../logics/config';
import { useNavigate, useParams } from 'react-router-dom';
import SubRubroService from '../../services/SubRubroService';
import { SubRubroContext } from './SubRubroContext';
import NameField from './fieldsComponents/NameField';
import DescField from './fieldsComponents/DescField';
import RubroSelectorField from './fieldsComponents/RubroSelectorField'

function FormBaseSubRubros(props) {
    const [subrubro, setSubrubro, rubros, EmptySubRubro,rubroPadreActual] = useContext(SubRubroContext)
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const controller = new AbortController();
        
        if (props.behavior==Behavior.agregar)
        {
            if (rubroPadreActual.current == null)
                rubroPadreActual.current = rubros[0];
            setSubrubro({
                idSubRubro:0,
                nombreSubRubro:'',
                descripcion:'',
                rubroPadre:rubroPadreActual.current,
            });
        }
        if(props.behavior==Behavior.modificar)
        {
            SubRubroService.getSubRubroByID(id,controller).then
            (response => setSubrubro(response.data)).catch
            (error => console.log(error));
        }
        return () => controller.abort()
    }, [props.behavior])


    const agregarSubRubro = (e) => {
        e.preventDefault();
        rubroPadreActual.current = subrubro.rubroPadre;
        SubRubroService.addSubRubro(subrubro).then((response) =>
        {
            console.log(response.data);
            navigate('/subrubros');
        }).catch( error => console.log(error) );
    }

    const modificarSubRubro = (e) => {
        e.preventDefault();
        SubRubroService.updateSubRubro(subrubro).then((response) =>
        {
            console.log(response.data);
            navigate("/subrubros");
        }).catch( error => console.log(error) );
    }

    return (
        <Container>
            <form onSubmit={(e) => {
                if (props.behavior==Behavior.agregar)
                    agregarSubRubro(e);
                if (props.behavior==Behavior.modificar)
                    modificarSubRubro(e);
            }}>
                {(()=>{
                    if (props.behavior==Behavior.agregar)
                        return (<h2>Agregar SubRubro</h2>)
                    if (props.behavior==Behavior.modificar)
                        return (<h2>Modificar SubRubro</h2>)
                })()}
                <NameField />
                <DescField />
                <RubroSelectorField />
                {(()=>{
                    if (props.behavior==Behavior.agregar)
                        return (<Row>
                            <Col><label htmlFor='addSubRubro'>Agregar SubRubro:</label></Col>
                            <Col><input id="addSubRubro "type="submit" value={"Agregar SubRubro"} /></Col>
                        </Row>)
                    if (props.behavior==Behavior.modificar)
                        return (<Row>
                            <Col><label htmlFor='updSubRubro'>Modificar SubRubro:</label></Col>
                            <Col><input id="updSubRubro "type="submit" value={"Modificar SubRubro"} /></Col>
                        </Row>)
                })()}
            </form>
        </Container>
    )
}

export default FormBaseSubRubros;
import { Container, Row, Col } from 'react-bootstrap';
import { Behavior } from '../../logics/config';
import DescField from './fieldsComponents/DescField';
import NameField from './fieldsComponents/NameField';
import RubroSelectorField from './fieldsComponents/RubroSelectorField';
import { useNavigate, useParams } from 'react-router-dom';
import RubroService from '../../services/RubroService';
import { useContext, useRef } from 'react';
import { useEffect } from 'react';
import { RubroContext } from './RubroContext';

function FormBaseRubros(props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [rubro, setRubro, EmptyRubro, listRubros,changedList,setChangedList] = useContext(RubroContext);

    useEffect(() => {
        const controller = new AbortController();
        if (props.behavior == Behavior.modificar) { 
            RubroService.getRubroByID(id,controller).then
            (response => setRubro(response.data)).catch
            (error => console.log(error));
        }
        if (props.behavior == Behavior.agregar) {
            setRubro(new EmptyRubro());
        }
        return () => controller.abort();
    }, [props.behavior])

    

    const agregarRubro = (e) => {
        e.preventDefault();
        console.log(rubro);
        RubroService.addRubro(rubro).then((response) => {
            console.log(response.data);
            navigate('/rubros');
        }).catch(error => console.log(error));
        setChangedList(changedList+1);
    }

    const modificarRubro = (e) => {
        e.preventDefault();
        RubroService.updateRubro(rubro).then((response) => {
            console.log(response.data);
            navigate('/rubros');
        }).catch(error => console.log(error));
        setChangedList(changedList+1);
    }

    return (
        <Container>
            <form onSubmit={(e) => {
                if (props.behavior == Behavior.agregar)
                    agregarRubro(e);
                if (props.behavior == Behavior.modificar)
                    modificarRubro(e);
            }}>
                {(() => {
                    if (props.behavior == Behavior.agregar)
                        return (<h2>Agregar Rubro</h2>);
                    if (props.behavior == Behavior.modificar)
                        return (<h2>Modificar Rubro</h2>);
                })()}
                <NameField key="name" />
                <DescField key="desc" />
                <RubroSelectorField />
                {(() => {
                    if (props.behavior == Behavior.agregar)
                        return (<Row>
                            <Col><label htmlFor='addRubro'>Agregar Rubro:</label></Col>
                            <Col><input id="addRubro " type="submit" value={"Agregar Rubro"} /></Col>
                        </Row>);
                    if (props.behavior == Behavior.modificar)
                        return (<Row>
                            <Col><label htmlFor='updRubro'>Modificar Rubro:</label></Col>
                            <Col><input id="updRubro " type="submit" value={"Modificar Rubro"} /></Col>
                        </Row>);
                })()}
            </form>
        </Container>
    )
}

export default FormBaseRubros;
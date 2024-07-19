import { useContext, useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Behavior } from '../../logics/config';
import { ClieProvContext } from './ClieProvContext';
import TypeClPrField from './fieldsComponents/TypeClPrField';
import TypePersField from './fieldsComponents/TypePersField';
import CuitCuilField from './fieldsComponents/CuitCuilField';
import DeAltaField from './fieldsComponents/DeAltaField';
import DireccionField from './fieldsComponents/DireccionField';
import DniField from './fieldsComponents/DniField';
import EmailField from './fieldsComponents/EmailField';
import NameEntityField from './fieldsComponents/NameEntityField';
import RazonSocialField from './fieldsComponents/RazonSocialField';
import SurnameEntityField from './fieldsComponents/SurnameEntityField';
import TelefonoField from './fieldsComponents/TelefonoField';
import ClienteService from '../../services/ClienteService';
import ProveedorService from '../../services/ProveedorService';
import { useNavigate, useParams } from 'react-router-dom';

function FormBaseClieProv (props) 
{
    const [clieprov,setClieprov,EmptyClieProv,
        typeclpr,setTypeclpr,typesClieProv,typesPersoneria] = useContext(ClieProvContext);
    
        const navigate = useNavigate();
        const { id } = useParams();
    
    const [enabled,setEnabled] = useState(true);

    useEffect( () => {
        const controller = new AbortController();
        if (props.behavior==Behavior.agregar) {
            setEnabled(true);
            setClieprov(new EmptyClieProv())
        }
        if (props.behavior==Behavior.modificar) {
            setEnabled(false);
            if (props.entidad==typesClieProv.cliente)
            {
                setTypeclpr(typesClieProv.cliente);
                ClienteService.getClienteByID(id,controller).then
                ((response) => {
                    setClieprov(response.data);
                }).catch
                (error => console.log(error));
            }
            if (props.entidad==typesClieProv.proveedor)
            {
                setTypeclpr(typesClieProv.proveedor);
                ProveedorService.getProveedorByID(id,controller).then
                ((response) => {
                    setClieprov(response.data);
                }).catch
                (error => console.log(error));
            }
        }
    },[props.behavior])

    const agregarEnte = (e) => {
        e.preventDefault();
        
        if (typeclpr==typesClieProv.cliente || typeclpr==typesClieProv.clieprov){
            ClienteService.addCliente(clieprov).then
            ((response) => {
                console.log(response.data);
                navigate("/entes/clientes");
            }).catch(error => console.log(error));
        }
        if (typeclpr==typesClieProv.proveedor || typeclpr==typesClieProv.clieprov){
            ProveedorService.addProveedor(clieprov).then
            ((response) => {
                console.log(response.data);
                navigate("/entes/proveedores");
            }).catch(error => console.log(error));
        }
    }

    const modificarEnte = (e) => {
        e.preventDefault();
        if (props.entidad==typesClieProv.cliente) {
            ClienteService.updateCliente(clieprov,id).then
            ((response) => {
                console.log(response.data);
                navigate("/entes/clientes");
            }).catch(error => console.log(error));
        }
        if (props.entidad==typesClieProv.proveedor) {
            ProveedorService.updateProveedor(clieprov,id).then
            ((response) => {
                console.log(response.data);
                navigate("/entes/proveedores");
            }).catch(error => console.log(error));
        }
    }

    return (
        <Container>
            <form onSubmit={(e) => {
                if (props.behavior == Behavior.agregar)
                    agregarEnte(e);
                if (props.behavior == Behavior.modificar)
                    modificarEnte(e);
            }}>
                {(() => {
                    if (props.behavior == Behavior.agregar)
                        return (<h2>Agregar Ente</h2>)
                    if (props.behavior == Behavior.modificar)
                        return (<h2>Modificar Ente {props.entidad}</h2>)
                })()}
            <TypeClPrField active={enabled}/>
            <TypePersField active={enabled}/>
            { clieprov.type==typesPersoneria.fisica ? (
                <>
                <NameEntityField/>
                <SurnameEntityField/>
                <DniField/>
                </>
            ) : <></> }
            {
                clieprov.type==typesPersoneria.juridica ? (
                    <>
                    <RazonSocialField />
                    <CuitCuilField/>
                    </>
                ) : <></> }
            <DireccionField/>
            <TelefonoField/>
            <EmailField/>
            {
                props.behavior==Behavior.modificar ? <DeAltaField/> : <></>
            }
            {(() => {
                    if (props.behavior == Behavior.agregar)
                        return (<Row>
                            <Col><label htmlFor='addEnte'>Agregar Ente:</label></Col>
                            <Col><input id="addEnte" type="submit" value={"Agregar"} /></Col>
                        </Row>)
                    if (props.behavior == Behavior.modificar)
                        return (<Row>
                            <Col><label htmlFor='updEnte'>Modificar Ente:</label></Col>
                            <Col><input id="updEnte" type="submit" value={"Modificar"} /></Col>
                        </Row>)
                })()}
            </form>
        </Container>
    )
}

export default FormBaseClieProv;
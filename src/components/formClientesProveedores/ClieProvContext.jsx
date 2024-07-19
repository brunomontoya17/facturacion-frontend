import { createContext, useState } from "react";

export const ClieProvContext = createContext();

export function ClieProvProvider ({children}) {
    
    const [clieprov,setClieprov] = useState(new EmptyClieProv());
    const [typeclpr,setTypeclpr] = useState('Proveedor');

    const typesClieProv = {
        cliente:'Cliente',
        proveedor:'Proveedor',
        clieprov:'ClienteProveedor'
    }

    const typesPersoneria = {
        fisica:'fisica',
        juridica:'juridica'
    }

    function EmptyClieProv () {
        this.type = 'fisica';
        this.email = '';
        this.telefono = '';
        this.direccion = '';
        this.deAlta = true;
        this.nombre = '';
        this.apellido = '';
        this.dni = 0;
        this.razonSocial = '';
        this.cuit_cuil= '';
    }

    return (
        <ClieProvContext.Provider value={
            [clieprov,setClieprov,EmptyClieProv,
            typeclpr,setTypeclpr,typesClieProv,typesPersoneria]}>
            {children}
        </ClieProvContext.Provider>
    )
}
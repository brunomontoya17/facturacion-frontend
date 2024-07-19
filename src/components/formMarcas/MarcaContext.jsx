import { createContext, useState } from "react"

export const MarcaContext = createContext();

export function MarcaProvider({children}){
    
    function EmptyMarca()
    {
        this.nombreMarca = '';
        this.descripcion = '';
    }

    const [marca,setMarca] = useState(new EmptyMarca());

    return (<MarcaContext.Provider value={[marca,setMarca,EmptyMarca]}>
        {children}
    </MarcaContext.Provider>)
}
import { createContext, useEffect, useState, useRef } from "react";
import RubroService from '../../services/RubroService';

export const SubRubroContext = createContext();

export function SubRubroProvider({children}){

    function EmptySubRubro()
    {
        this.idSubRubro=0;
        this.nombreSubRubro = '';
        this.descripcion = '';
        this.rubroPadre = {
            nombreRubro:'',
            descripcion:''
        };
    }

    useEffect(() => {
        const controller = new AbortController();          
        RubroService.getRubros(controller).then
        (response => setRubros(response.data)).catch
        (error => console.log(error));
        return () => controller.abort();
    },[])

    const [subrubro,setSubrubro] = useState(new EmptySubRubro());
    const [rubros,setRubros] = useState([]);
    const rubroPadreActual = useRef(null);

    return (<SubRubroContext.Provider value={[subrubro,setSubrubro,rubros,EmptySubRubro,rubroPadreActual]}>
        {children}
    </SubRubroContext.Provider>)

}
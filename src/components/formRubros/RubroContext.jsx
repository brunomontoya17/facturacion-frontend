import { createContext, useEffect, useState } from "react"
import RubroService from "../../services/RubroService";

export const RubroContext = createContext();

export function RubroProvider({children}) {
    
    function EmptyRubro()
    {
        this.idRubro = 0;
        this.nombreRubro = '';
        this.descripcion = '';
        this.rubroPadre = null;
    }

    const [listRubros,setListRubros] = useState([]);
    const [changedList,setChangedList] = useState(0);
    
    const [rubro, setRubro] = useState(new EmptyRubro());

    useEffect(() => {
        const controller = new AbortController();
        RubroService.getRubros(controller).then
        (response => setListRubros(response.data)).catch
        (error => console.log(error));
        return () => controller.abort();
    },[changedList])

    return (
        <RubroContext.Provider value={[rubro,setRubro,EmptyRubro,listRubros,changedList,setChangedList]}>
            {children}
        </RubroContext.Provider>
    )
}
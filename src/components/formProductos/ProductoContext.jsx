import { createContext } from "react";
import { useState, useEffect, useRef } from "react";
import RubroService from "../../services/RubroService";
import MarcaService from "../../services/MarcaService";

export const ProductoContext = createContext();

export function ProductoProvider({ children }) {


    function EmptyProducto() {
        this.codigoDeBarras = '';
        this.nombreProducto = '';
        this.descripcion = '';
        this.precio = 0.0;
        this.rubro = lastAddSelectedRubro.current;
        this.marca = new EmptyMarca();
        this.planillaStock = new EmptyPlanilla();
    }

    function EmptyMarca()
    {
        this.idMarca = 0;
        this.nombreMarca = 'Sin Marca';
        this.descripcion = '';
    }

    function EmptyPlanilla() {
        this.idPlanillaStock = 0;
        this.cantidad_stock = 0;
        this.cantidad_critica = 0;
        this.cantidad_ultima_entrada = 0;
        this.diferencia_ajuste = 0;
    }

    useEffect(() => {
        const controller = new AbortController();
        RubroService.getRubros(controller).then
            (response => setRubros(response.data)).catch
            (error => console.log(error));
        MarcaService.getMarcas(controller).then
            (response => setMarcas(response.data)).catch
            (error => console.log(error));
        return () => controller.abort();
    }, [])
    
    const [rubros, setRubros] = useState([]);
    const [marcas, setMarcas] = useState([]);

    const lastAddSelectedRubro = useRef({});
    const lastAddSelectedMarca = useRef({});

    const [producto, setProducto] = useState(new EmptyProducto());
    const [manejoStock,setManejoStock] = useState(true);
    

    

    return (
        <ProductoContext.Provider value={[producto, setProducto, EmptyProducto,
            rubros, marcas, manejoStock, setManejoStock, 
            EmptyMarca, EmptyPlanilla, lastAddSelectedRubro, lastAddSelectedMarca]}>
            {children}
        </ProductoContext.Provider>
    )
}
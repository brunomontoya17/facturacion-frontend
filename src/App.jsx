import { Fragment } from "react";
import MenuPrincipal from "./components/MenuPrincipal"
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import ListadoProductos from "./components/formProductos/ListadoProductos";
import ListadoRubros from "./components/formRubros/ListadoRubros";

import ListadoMarcas from "./components/formMarcas/ListadoMarcas";
import FormBaseRubros from "./components/formRubros/FormBaseRubros";
import { Behavior, typesEnte, typesPages } from "./logics/config";
import { RubroProvider } from "./components/formRubros/RubroContext";

import { MarcaProvider } from "./components/formMarcas/MarcaContext";
import FormBaseMarcas from "./components/formMarcas/FormBaseMarcas";
import { ProductoProvider } from "./components/formProductos/ProductoContext";
import FormBaseProductos from "./components/formProductos/FormBaseProductos";
import { ClieProvProvider } from "./components/formClientesProveedores/ClieProvContext";
import FormBaseClieProv from "./components/formClientesProveedores/FormBaseClieProv";
import ListadoEntes from "./components/formClientesProveedores/ListadoEntes";
import VisadoProducto from "./components/formProductos/VisadoProducto";
import FacturacionConsFinal from "./components/formFacturacion/FacturacionConsFinal";

function App() {

  return (
    <>
      <BrowserRouter>
        <MenuPrincipal />
        <div className="container">

          <Routes>
            <Route path="/" element={<Fragment />} />
            <Route path="/productos" element={<ProductoProvider><Outlet /></ProductoProvider>}>
              <Route path="/productos/per100page/:page" element={<ListadoProductos pagesize={typesPages.one_hundred} />} />
              <Route path="/productos/per50page/:page" element={<ListadoProductos pagesize={typesPages.fifty}/>} />
              <Route path="/productos/per25page/:page" element={<ListadoProductos pagesize={typesPages.twenty_five}/>} />
              <Route path="/productos/:id" element={<VisadoProducto />} />
              <Route path="/productos/insert" element={<FormBaseProductos behavior={Behavior.agregar} />} />
              <Route path="/productos/update/:id" element={<FormBaseProductos behavior={Behavior.modificar} />} />
            </Route>
            <Route path="/rubros" element={<RubroProvider><Outlet /></RubroProvider>}>
              <Route exact path="/rubros/" element={<ListadoRubros />} />
              <Route exact path="/rubros/insert" element={<FormBaseRubros behavior={Behavior.agregar} />} />
              <Route exact path="/rubros/update/:id" element={<FormBaseRubros behavior={Behavior.modificar} />} />
            </Route>
            <Route path="/marcas" element={<MarcaProvider><Outlet /></MarcaProvider>}>
              <Route path="/marcas" element={<ListadoMarcas />} />
              <Route path="/marcas/insert" element={<FormBaseMarcas behavior={Behavior.agregar} />} />
              <Route path="/marcas/update/:id" element={<FormBaseMarcas behavior={Behavior.modificar} />} />
            </Route>
            <Route path="/entes" element={<ClieProvProvider><Outlet/></ClieProvProvider>}>
              <Route path="/entes/clientes" element={<ListadoEntes entidad={typesEnte.cliente}/>}/>
              <Route path="/entes/proveedores" element={<ListadoEntes entidad={typesEnte.proveedor}/>}/>
              <Route path="/entes/insert" element={<FormBaseClieProv behavior={Behavior.agregar}/>} />
              <Route path="/entes/clientes/update/:id" element={<FormBaseClieProv behavior={Behavior.modificar} entidad={typesEnte.cliente}/>}/>
              <Route path="/entes/proveedores/update/:id" element={<FormBaseClieProv behavior={Behavior.modificar} entidad={typesEnte.proveedor}/>}/>
            </Route>
            <Route path="/fact-cons-final" element={<FacturacionConsFinal/>} />
          </Routes>

        </div>
      </BrowserRouter>
    </>
  )
}

export default App

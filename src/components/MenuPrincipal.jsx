import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';


function MenuPrincipal() {
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/">Sistema Facturacion</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <NavDropdown title="Productos" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/productos/per100page/1">Listado de Productos</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/productos/insert">Agregar Producto</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Rubros" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/rubros/per50page/1">Listado de Rubros</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/rubros/insert">Agregar Rubro</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Marcas" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/marcas/per50page/1">Listado de Marcas</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/marcas/insert">Agregar Marca</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Entes" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/entes/clientes">Listado de Clientes</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/entes/proveedores">Listado de Proveedores</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/entes/insert">Agregar Ente</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Facturacion" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/fact-cons-final">Facturacion Consumidor Final</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/fact-cliente">Facturacion Clientes</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/ver-facturas">Ver Facturas</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Manejo de Stock" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/ingresar-entrada-stock">Crear Entrada Stock</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/">Crear Salida Stock</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/">Ver Entradas</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/">Ver Salidas</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/">Ajustar Stock</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/">Ver ajustes de Stock</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Opciones Avanzadas" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/">Carga masiva de productos</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/">Modificacion de precios por Excel</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/">Modificacion de precios por porcentaje</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default MenuPrincipal;
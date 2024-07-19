import axios from 'axios';


const PATH_TO_SERVER = "http://localhost:8080/productos";

class ProductoService {
    getProductos(controller)
    {
        return axios.get(`${PATH_TO_SERVER}/all`,{signal:controller.signal});
    }
    getProductoByID(id,controller)
    {
        return axios.get(`${PATH_TO_SERVER}/${id}`,{signal:controller.signal});
    }
    getProductoByBarcode(barcode,controller)
    {
        return axios.get(`${PATH_TO_SERVER}/bybarcode/${barcode}`,{signal:controller.signal});
    }
    addProducto(producto)
    {
        return axios.post(`${PATH_TO_SERVER}/insert`,producto);
    }
    updateProducto(producto)
    {
        return axios.post(`${PATH_TO_SERVER}/update/${producto.idProducto}`,producto);
    }

}

export default new ProductoService();
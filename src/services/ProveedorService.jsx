import axios from 'axios';

const PATH_TO_SERVER = "http://localhost:8080/proveedores";

class ProveedorService {
    getProveedores(controller){
        return axios.get(`${PATH_TO_SERVER}/all`,{signal:controller.signal});
    }
    getProveedorByID(id,controller){
        return axios.get(`${PATH_TO_SERVER}/${id}`,{signal:controller.signal});
    }
    addProveedor(proveedor){
        return axios.post(`${PATH_TO_SERVER}/insert`,proveedor);
    }
    updateProveedor(proveedor,id){
        return axios.post(`${PATH_TO_SERVER}/update/${id}`,proveedor);
    }
}

export default new ProveedorService();
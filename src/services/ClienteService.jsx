import axios from 'axios';

const PATH_TO_SERVER = "http://localhost:8080/clientes";

class ClienteService {
    getClientes(controller){
        return axios.get(`${PATH_TO_SERVER}/all`,{signal:controller.signal});
    }
    getClienteByID(id,controller){
        return axios.get(`${PATH_TO_SERVER}/${id}`,{signal:controller.signal});
    }
    addCliente(cliente){
        return axios.post(`${PATH_TO_SERVER}/insert`,cliente);
    }
    updateCliente(cliente,id){
        return axios.post(`${PATH_TO_SERVER}/update/${id}`,cliente);
    }
}

export default new ClienteService();
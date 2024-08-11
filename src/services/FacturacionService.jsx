import axios from 'axios';

const PATH_TO_SERVER = "http://localhost:8080/facturacion";

class FacturacionService {
    getFacturas(controller)
    {
        return axios.get(`${PATH_TO_SERVER}/all`,{signal:controller.signal});
    }
    getFacturaByID(id,controller)
    {
        return axios.get(`${PATH_TO_SERVER}/${id}`,{signal:controller.signal});
    }
    getFacturasByCliente(id,controller)
    {
        return axios.get(`${PATH_TO_SERVER}/bycliente/${id}`,{signal:controller.signal});
    }
    generateFactura(factura)
    {
        return axios.post(`${PATH_TO_SERVER}/generatebill`, factura);
    }
}

export default new FacturacionService();
import axios from 'axios';

const PATH_TO_SERVER = "http://localhost:8080/eysstock";

class EySdeStockService {
    generateInput(entradaStock) {
        return axios.post(`${PATH_TO_SERVER}/entrada/insert`,entradaStock);
    }
}

export default new EySdeStockService();
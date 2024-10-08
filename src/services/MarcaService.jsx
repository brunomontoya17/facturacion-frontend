import axios from 'axios';

const PATH_TO_SERVER = "http://localhost:8080/marcas";

class MarcaService {
    getMarcas(controller){
        return axios.get(`${PATH_TO_SERVER}/all`,{signal:controller.signal});
    }
    getMarcaByID (id,controller){
        return axios.get(`${PATH_TO_SERVER}/${id}`,{signal:controller.signal});
    }
    getMarcasx50(page,controller){
        return axios.get(`${PATH_TO_SERVER}/per50page/${page}`,{signal:controller.signal});
    }
    getMarcasx25(page,controller){
        return axios.get(`${PATH_TO_SERVER}/per25page/${page}`,{signal:controller.signal});
    }
    getMarcasx10(page,controller){
        return axios.get(`${PATH_TO_SERVER}/per10page/${page}`,{signal:controller.signal});
    }
    addMarca (marca){
        return axios.post(`${PATH_TO_SERVER}/insert`,marca);
    }
    updateMarca (marca){
        return axios.post(`${PATH_TO_SERVER}/update/${marca.idMarca}`,marca);
    }
}

export default new MarcaService();
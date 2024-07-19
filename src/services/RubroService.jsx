import axios from 'axios';


const PATH_TO_SERVER = "http://localhost:8080/rubros";

class RubroService {
    getRubros (controller)
    {
        return axios.get(`${PATH_TO_SERVER}/all`,{ signal: controller.signal});
    }
    getRubroByID (id,controller)
    {
        return axios.get(`${PATH_TO_SERVER}/${id}`,{ signal: controller.signal});
    }
    addRubro (rubro)
    {
        return axios.post(`${PATH_TO_SERVER}/insert`,rubro);
    }
    updateRubro (rubro)
    {
        return axios.post(`${PATH_TO_SERVER}/update/${rubro.idRubro}`,rubro);
    }
}

export default new RubroService();
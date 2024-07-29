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
    getRubrosx50 (page,controller)
    {
        return axios.get(`${PATH_TO_SERVER}/per50page/${page}`,{ signal: controller.signal});
    }
    getRubrosx25 (page,controller)
    {
        return axios.get(`${PATH_TO_SERVER}/per25page/${page}`,{ signal: controller.signal});
    }
    getRubrosx10 (page,controller)
    {
        return axios.get(`${PATH_TO_SERVER}/per10page/${page}`,{ signal: controller.signal});
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
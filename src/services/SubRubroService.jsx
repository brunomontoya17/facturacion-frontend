import axios from 'axios';


const PATH_TO_SERVER = "http://localhost:8080/subrubros";

class SubRubroService {
    getSubRubros(controller)
    {
        return axios.get(`${PATH_TO_SERVER}/all`,{signal:controller.signal});
    }
    getSubRubroByID(id,controller)
    {
        return axios.get(`${PATH_TO_SERVER}/${id}`,{signal:controller.signal});
    }
    getSubRubrosByRubro(id,controller)
    {
        return axios.get(`${PATH_TO_SERVER}/byrubro/${id}`,{signal:controller.signal});
    }
    addSubRubro(subrubro)
    {
        return axios.post(`${PATH_TO_SERVER}/insert`,subrubro);
    }
    updateSubRubro(subrubro)
    {
        return axios.post(`${PATH_TO_SERVER}/update/${subrubro.idSubRubro}`,subrubro);
    }
}

export default new SubRubroService();
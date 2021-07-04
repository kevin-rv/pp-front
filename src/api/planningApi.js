import axios from 'axios';
import qs from 'qs';



class planningApi
{
    constructor(rootPath)
    {
        this.rootPath = rootPath
    }

    setToken(token)
    {
        this.token = token

        return this;
    }

    login(email, password)
    {
        return axios
            .post(this.rootPath + '/auth', qs.stringify({email, password}), {headers: { 'content-type': 'application/x-www-form-urlencoded' }})
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }

    createOnePlanning()
    {
        return axios
            .post(this.rootPath + '/planning', qs.stringify({name}), {headers: { 'authorization': 'Bearer ' + this.token }})
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }

    getAllPlannings()
    {
        console.log(this.token)
        return axios
            .get(this.rootPath + '/planning', {headers: { 'authorization': 'Bearer ' + this.token }})
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }
    getPlanningAllEvents(id) {
        return axios
            .get(this.rootPath + '/planning/' + id + '/event', {headers: { 'authorization': 'Bearer ' + this.token }})
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }
    getPlanningAllTasks(id) {
        return axios
            .get(this.rootPath + '/planning/' + id + '/task', {headers: { 'authorization': 'Bearer ' + this.token }})
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }
    getAllContact() {
        return axios
            .get(this.rootPath + '/contacts' , {headers: { 'authorization': 'Bearer ' + this.token }})
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }


    _errorManagement(error)
    {
        if (error.response) {
            throw Error(error.response.data.error || 'unknown error')
        } else if (error.request) {
            throw Error(error.request.toString());
        }

        throw Error(error.message);
    }

}

export default new planningApi(process.env.VUE_APP_PLANNING_API_ROOT);

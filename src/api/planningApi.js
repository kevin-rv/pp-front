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

    createOneUser(name, email, password)
    {
        return axios
            .post(this.rootPath + '/user', qs.stringify({name, email, password}), {headers: {
                    'content-type': 'application/x-www-form-urlencoded'}}
            )
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }

    createOnePlanning(name)
    {
        return axios
            .post(this.rootPath + '/planning', qs.stringify({name}), {headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }

    createOneTask(id, shortDescription, done, doneLimitDate)
    {
        console.log(qs.stringify({shortDescription, done, doneLimitDate}));

        return axios
            .post(this.rootPath + '/planning/' + id + '/task', qs.stringify({shortDescription, done, doneLimitDate}), {headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }

    createOneEvent(id, shortDescription, fullDescription, startDatetime, endDatetime, contacts)
    {

        return axios
            .post(this.rootPath + '/planning/' + id + '/event', qs.stringify({shortDescription, fullDescription, startDatetime, endDatetime, contacts}), {headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }

    createOneContact(name, phoneNumber, home, birthday, email, relationship, work)
    {

        return axios
            .post(this.rootPath + '/contact', qs.stringify({name, phoneNumber, home, birthday, email, relationship, work}), {headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
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

    updatePlanning(id, name)
    {
        return axios
            .patch(this.rootPath + '/planning/' + id , qs.stringify({name}), {headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }

    updateContact(id, name, phoneNumber, home, birthday, email, relationship, work)
    {
        return axios
            .patch(this.rootPath + '/contact/' + id , qs.stringify({name, phoneNumber, home, birthday, email, relationship, work}), {headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }


    updateTask(planningId, taskId, shortDescription, done, doneLimitDate)
    {
        return axios
            .patch(this.rootPath + '/planning/' + planningId + '/task/'+ taskId, qs.stringify({shortDescription, done, doneLimitDate}), {headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }

    deletePlanning(id)
    {
        return axios
            .delete(this.rootPath + '/planning/' + id ,{headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
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

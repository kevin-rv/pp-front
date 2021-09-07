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

    createOneUser(name, email, password, confirmPassword, birthday)
    {
        return axios
            .post(this.rootPath + '/user', qs.stringify({name, email, password, confirmPassword, birthday}), {headers: {
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

    createOneTask(planningId, task)
    {
        return axios
            .post(this.rootPath + '/planning/' + planningId + '/task', qs.stringify(task), {headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }

    createOneEvent(planningId, event)
    {
        return axios
            .post(this.rootPath + '/planning/' + planningId + '/event', qs.stringify(event), {headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }

    createOneContact(contact)
    {

        return axios
            .post(this.rootPath + '/contact', qs.stringify(contact), {headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }
    getUser() {
        return axios
            .get(this.rootPath + '/user', {headers: { 'authorization': 'Bearer ' + this.token }}
            )
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)

    }
    getAllPlannings()
    {
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
    updateUser(name, email, birthday, phoneNumber, home, work)
    {
        return axios
            .patch(this.rootPath + '/user', qs.stringify({name, email, birthday, phoneNumber, home, work}), {headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
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

    updateContact(contactId, contact)  // TODO "contactId" simplifié et faire la modif partout
    {
        return axios
            .patch(this.rootPath + '/contact/' + contactId , qs.stringify(contact), {headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }


    updateTask(planningId, task)
    {
        return axios
            .patch(this.rootPath + '/planning/' + planningId + '/task/'+ task.id, qs.stringify(task), {headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }


    updateEvent(planningId, event)
    {
        return axios
            .patch(this.rootPath + '/planning/' + planningId + '/event/'+ event.id, qs.stringify(event), {headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }

    deleteUser()
    {
        return axios
            .delete(this.rootPath + '/user' ,{headers: {
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

    deleteEvent(planningId, eventId)
    {
        return axios
            .delete(this.rootPath + '/planning/' + planningId + '/event/' + eventId ,{headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }

    deleteTask(planningId, taskId)
    {
        return axios
            .delete(this.rootPath + '/planning/' + planningId + '/task/' + taskId ,{headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer ' + this.token }}
            )
            .then((response) => {
                return response.data
            })
            .catch(this._errorManagement)
    }
    deleteContact(contactId)
    {
        return axios
            .delete(this.rootPath + '/contact/' + contactId ,{headers: {
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

        console.log(error)

        if (error.response) {
            throw Error(error.response.data.error || 'unknown error')
        } else if (error.request) {
            throw Error(error.request.toString());
        }

        throw Error(error.message);
    }

}

export default new planningApi(process.env.VUE_APP_PLANNING_API_ROOT);

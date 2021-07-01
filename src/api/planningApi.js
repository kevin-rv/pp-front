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

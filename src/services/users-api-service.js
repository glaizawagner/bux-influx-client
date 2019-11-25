import config from '../config';
import TokenService from './token-service';

const UsersApiService = {
    getLoggedInUser() {
        return fetch(`${config.API_ENDPOINT}/users/current-user`, { 
            method: 'GET',
            headers: {
              'authorization': `bearer ${TokenService.getAuthToken()}`
            }
          }).then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
          )
    },
}

export default UsersApiService;
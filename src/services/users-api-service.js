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
    postUser(newUser) {
      // console.log(JSON.stringify(newUser));
      return fetch(`${config.API_ENDPOINT}/users`, {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`,
          },
          body: JSON.stringify(
              newUser
          )
      })
          .then(res =>
              (!res.ok)
                  ? res.json().then(e => Promise.reject(e))
                  : res.json()
          )
  }
}

export default UsersApiService;
import TokenService from '../services/token-service'
import config from '../config'

const BuxinfluxApiService = {
    getAllIncome() {
        return fetch(`${config.API_ENDPOINT}/income`, {
          headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`,
          },
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },
    getIncome(iid) {
        return fetch(`${config.API_ENDPOINT}/income/${iid}`, {
          headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`,
          },
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },
    getExpense() {
        return fetch(`${config.API_ENDPOINT}/expenses`, {
          headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`,
          },
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },
    getExpenses(eid) {
        return fetch(`${config.API_ENDPOINT}/expenses/${eid}`, {
          headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`,
          },
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },
}

export default BuxinfluxApiService;
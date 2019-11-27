import TokenService from '../services/token-service'
import config from '../config'

const BuxinfluxApiService = {
    getAllIncome() {
        return fetch(`${config.API_ENDPOINT}/income/`, {
          method: 'GET',
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
          method: 'GET',
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
    getAllExpenses() {
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
          method: 'GET',
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
  
    addNewIncome(user_id){
      return fetch(`${config.API_ENDPOINT}/income`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(user_id)
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },

    deleteIncome(iid) {
      return fetch(`${config.API_ENDPOINT}/income/${iid}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
          iid: iid
        })
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : null
        )
  },
  deleteExpenses(eid) {
    return fetch(`${config.API_ENDPOINT}/expenses/${eid}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        eid: eid
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : null
      )
  },
    addNewExpenses(newExpense){
      return fetch(`${config.API_ENDPOINT}/expenses`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(newExpense)
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },

    getUserAllIncome(user_id) {
      return fetch(`${config.API_ENDPOINT}/users/${user_id}/income`, {
        method: 'GET',
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
    getUserAllExpenses(user_id) {
      return fetch(`${config.API_ENDPOINT}/users/${user_id}/expenses`, {
        method: 'GET',
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
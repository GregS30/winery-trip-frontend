const API = 'http://localhost:3000/api/v1';
// const API = 'https://winery-trip.herokuapp.com/api/v1/';

class AdapterAPI {

    static getWineryData(searchTerms) {
      return fetch(`${API}/winery?search=${searchTerms}%20winery`)
           .then(r => r.json())
    }

    static getWineries(region, grape) {
        return fetch(`${API}/wineries?region=${region}&grape=${grape}`)
             .then(r => r.json())
    }

    static getRegions() {
        return fetch(`${API}/regions`)
             .then(r => r.json())
    }

    static getGrapes() {
        return fetch(`${API}/grapes`)
             .then(r => r.json())
    }

    static getWines(wineryID) {
        return fetch(`${API}/wines?wineryId=${wineryID}`)
             .then(r => r.json())
    }
}

export default AdapterAPI;

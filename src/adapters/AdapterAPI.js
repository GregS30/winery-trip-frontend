const API = 'http://localhost:3000/api/v1';
// const API = 'https://winery-trip.herokuapp.com/api/v1/';

class AdapterAPI {

    static fetchWineryDetails(searchTerms) {
      return fetch(`${API}/winery?search=${searchTerms}%20winery`)
           .then(r => r.json())
    }

    static fetchWineries(region, grape) {
        return fetch(`${API}/wineries?region=${region}&grape=${grape}`)
             .then(r => r.json())
    }

    static fetchRegions() {
        return fetch(`${API}/regions`)
             .then(r => r.json())
    }

    static fetchGrapes() {
        return fetch(`${API}/grapes`)
             .then(r => r.json())
    }

    static fetchWines(wineryID) {
        return fetch(`${API}/wines?wineryId=${wineryID}`)
             .then(r => r.json())
    }
}

export default AdapterAPI;

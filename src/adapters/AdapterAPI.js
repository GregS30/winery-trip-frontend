const API = 'http://localhost:3000/api/v1';
// const API = 'https://winery-trip.herokuapp.com/api/v1/';

class AdapterAPI {
     
    static getWineryData(searchTerms) {
      return fetch(`${API}/winery?search=${searchTerms}`)
           .then(r => r.json())
    }

    static getWineries() {
        return fetch(`${API}/wineries`)
             .then(r => r.json())
    }

    static getRegions() {
        return fetch(`${API}/regions`)
             .then(r => r.json())
    }
}

export default AdapterAPI;
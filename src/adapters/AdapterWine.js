import AdapterUser from './AdapterUser'

export const API = 'http://localhost:3000/api/v1';
// const API = 'https://winery-trip.herokuapp.com/api/v1/';

class AdapterWine {

  static fetchRegions() {
    // fetch regions list for filter
      return fetch(`${API}/regions`)
           .then(r => r.json())
  }

  static fetchGrapes() {
    // fetch grapes list for varietal filter
      return fetch(`${API}/grapes`)
           .then(r => r.json())
  }

  static fetchWineries(region, grape) {
    // fetch main wineries list filtered by region and grape
      return fetch(`${API}/wineries?region=${region}&grape=${grape}`)
           .then(r => r.json())
  }

  static fetchWineryDetails(searchTerms) {
    // fetch to google places API
    return fetch(`${API}/winery?search=${searchTerms}%20winery`)
         .then(r => r.json())
  }

  static fetchWines(wineryID) {
    // fetch wines for showing in winery detail
      return fetch(`${API}/wines?wineryId=${wineryID}`)
           .then(r => r.json())
  }

  static fetchWineriesForUser(id) {
    return fetch(`${API}/users/${id}/wineries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": AdapterUser.getToken()
      }
    })
    .then(resp =>
      {
        if (resp.ok) {
          return resp.json()
        }
        else {
          console.log("error getMyWineries()")
        }
    });
  }

  static postWinery(winery, userId) {
    return fetch(`${API}/users/${userId}/wineries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({winery_id: winery.id})
    })
    .then(resp =>
      {
        if (resp.ok) {
          return resp.json()
        }
        else {
          console.log("error postWinery()")
        }
    });
  }
}

export default AdapterWine;

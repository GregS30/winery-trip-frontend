export const API = 'http://localhost:3000';
// const API = 'https://winery-trip.herokuapp.com/api/v1/';

class Adapter {
  static setToken(jsonToken) {
    localStorage.setItem("token", jsonToken)
  }

  static getToken() {
    localStorage.getItem("token")
  }

  static deleteToken() {
    localStorage.removeItem("token")
  }

  static getCurrentUser() {
    return fetch(`${API}/current_user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.getToken()
      }
    })
    .then(resp =>
      {
        if (resp.ok) {
          return resp.json()
        }
        else {
          console.log("error getCurrentUser()")
        }
    });
  }


}

export default Adapter;

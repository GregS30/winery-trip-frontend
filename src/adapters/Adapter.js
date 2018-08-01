export const API = 'http://localhost:3000/api/v1';
// const API = 'https://winery-trip.herokuapp.com/api/v1/';

class Adapter {
  static setToken(jsonToken) {
    return localStorage.setItem("token", jsonToken)
  }

  static getToken() {
    return localStorage.getItem("token")
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

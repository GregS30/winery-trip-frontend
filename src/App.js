import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, withRouter} from 'react-router-dom';

//CSS
import './App.css';

//ADAPTERS
import Adapter from './adapters/Adapter'
import { API } from './adapters/Adapter'

//COMPONENTS
import Header from './components/Header.js';
import Navbar from './components/Navbar.js';
import WineryContainer from './containers/WineryContainer.js';
import Footer from './components/Footer.js';
import TripContainer from './containers/TripContainer.js';

class App extends Component {
  constructor () {
    super()
    this.state = {
      username: "",
      id: "",
      loggedIn: false,
      myWineries: [],
      winery: null,
    }
  }

  // AUTO-LOGIN functionality -if token is present in LocalStorage
  componentDidMount(){
    if (Adapter.getToken()) {
      Adapter.getCurrentUser()
      .then(json => {
        console.log(json);
        this.setState({
            id: json.id,
            username: json.username,
            loggedIn: true,
        }, this.getMyWineries)
      })
      .catch(err => {
          // console.warn(err);
        Adapter.deleteToken();
      })
    }
  }

  getMyWineries = () => {
    Adapter.getMyWineries(this.state.id)
    .then(json => {
      console.log(json);
      this.setState({
        myWineries: json,
      })
    })
    .catch(err => {
        // console.warn(err);
      Adapter.deleteToken();
    })
  }



  //PROPS FUNCTIONALITY: NavBar handlers
  setUser = (username, id) => {
    this.setState({
      username: username,
      id: id,
      loggedIn: true,
      });
  }

  handleLogout = (event) => {
    Adapter.deleteToken();
    this.setState({
      username: "",
      password: "",
      loggedIn: false,
      }, () => this.props.history.push('/'));
  }

  //PROPS FUNCTIONALITY: WineryContainer handlers
  saveWinery = (winery) => {
    fetch(`${API}/users/${this.state.id}/wineries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({winery_id: winery.id})
    })
    .then(resp => resp.json())
    .then(json => this.setState({
          myWineries: json,
        }, () => console.log(this.state))
      )
  }

  render() {
    console.log(this.state.myWineries)
    return (
      <div className="App">

        <Router>
          <Fragment>
            <div className="header-nav">
              <Header />
              <Navbar
                    handleLogout={this.handleLogout}
                    loggedIn={this.state.loggedIn}
                    setUser={this.setUser}
                    getMyWineries ={this.getMyWineries}
              />
            </div>
            <Route
              exact path="/"
              render={() =>
                <WineryContainer
                  saveWinery={this.saveWinery}
                  username={this.state.username}
                  myWineries={this.state.myWineries}
                />}
            />
            <Route
              exact path="/mywineries"
              render={() =>
                <TripContainer
                  myWineries={this.state.myWineries}
                  username={this.state.username}
                />}
            />

          </Fragment>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);

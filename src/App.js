import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, withRouter} from 'react-router-dom';

//CSS
import './App.css';

//ADAPTERS
import AdapterUser from './adapters/AdapterUser'
import AdapterWine from './adapters/AdapterWine'

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
      userId: null,
      loggedIn: false,
      myWineries: [],
    }
  }

  // AUTO-LOGIN functionality -if token is present in LocalStorage
  componentDidMount(){
    if (AdapterUser.getToken()) {
      AdapterUser.getCurrentUser()
      .then(json => {
        console.log(json);
        this.setState({
            userId: json.id,
            username: json.username,
            loggedIn: true,
        }, this.getMyWineries)
      })
      .catch(err => {
          // console.warn(err);
        AdapterUser.deleteToken();
      })
    }
  }

  getMyWineries = () => {
    AdapterWine.fetchWineriesForUser(this.state.userId)
    .then(json => {
      console.log(json);
      this.setState({
        myWineries: json,
      })
    })
    .catch(err => {
        // console.warn(err);
      AdapterUser.deleteToken();
    }, () => console.log('getMyWineries', this.state))
  }

  //PROPS FUNCTIONALITY: NavBar handlers
  setUser = (username, id, loggedIn) => {
    this.setState({
      username: username,
      userId: id,
      loggedIn: loggedIn,
    });
  }

  handleLogout = () => {
    AdapterUser.deleteToken();
    this.setState({
      username: "",
      userId: null,
      loggedIn: false,
    }, () => this.props.history.push('/'));
  }

  saveWinery = (winery) => {
    AdapterWine.postWinery(winery, this.state.userId)
    .then(json => this.setState({
        myWineries: json,
    }))
  }

  render() {
    console.log(this.state.myWineries)
    return (
      <div className="App">
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
                  username={this.state.username}
                  myWineries={this.state.myWineries}
                  userId={this.state.userId}
                  saveWinery={this.saveWinery}
                />}
            />
            <Route
              exact path="/mywineries"
              render={() =>
                <TripContainer
                  myWineries={this.state.myWineries}
                  username={this.state.username}
                  saveWinery={this.saveWinery}
                />}
            />
          </Fragment>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);

import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//CSS
import './App.css';

//ADAPTERS
import AdapterUser from './adapters/AdapterUser';
import AdapterWine from './adapters/AdapterWine';

//COMPONENTS
import Header from './components/Header.js';
import Navbar from './components/Navbar.js';
import WineryContainer from './containers/WineryContainer.js';
import Footer from './components/Footer.js';
import TripContainer from './containers/TripContainer.js';

// ACTIONS
import { login, logout, storeMyWineries, storeWineryDetails } from './actions';

class App extends Component {

  // AUTO-LOGIN functionality -if token is present in LocalStorage
  componentDidMount(){
    if (AdapterUser.getToken()) {
      AdapterUser.getCurrentUser()
      .then(json => {
//        console.log(json);
        this.props.login(json.username, json.id);
        this.getMyWineries();
      })
      .catch(err => {
          // console.warn(err);
        AdapterUser.deleteToken();
      })
    }
  }

  getMyWineries = () => {
    AdapterWine.fetchWineriesForUser(this.props.userId)
    .then(this.props.storeMyWineries)
    .catch(err => {
        // console.warn(err);
      AdapterUser.deleteToken();
    });
  }

  handleLogout = () => {
    AdapterUser.deleteToken();
    this.props.logout();
    this.props.history.push('/');
  }

  saveWinery = (winery) => {
    AdapterWine.postWinery(winery, this.props.userId)
    .then(this.props.storeMyWineries)
  }

  handleWineryClick = (e, selectedWinery) => {
    AdapterWine.fetchWineryDetails(selectedWinery.name)
    .then(json => {
      if (json["message"] === "No Data") {
        this.props.storeWineryDetails(null, selectedWinery)
      }
      else {
        this.props.storeWineryDetails(json, selectedWinery)
      }
    })
  }

  render() {
   console.log("App render", this.props)
    return (
      <div className="App">
          <Fragment>
            <div className="header-nav">
              <Header />
              <Navbar
                handleLogout={this.handleLogout}
                loggedIn={this.props.loggedIn}
                setUser={this.setUser}
                getMyWineries ={this.getMyWineries}
              />
            </div>
            <Route
              exact path="/"
              render={() =>
                <WineryContainer
                  saveWinery={this.saveWinery}
                  handleWineryClick={this.handleWineryClick}
                />}
            />
            <Route
              exact path="/mywineries"
              render={() =>
                <TripContainer
                  saveWinery={this.saveWinery}
                  handleWineryClick={this.handleWineryClick}
                />}
            />
          </Fragment>
        <Footer />
      </div>
    );
  }
}

// redux props
const mapStateToProps = state => {
  return {
    username: state.username,
    userId: state.userId,
    loggedIn: state.loggedIn,
    myWineries: state.myWineries,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, userId) => dispatch(login(username, userId)),
    logout: () => dispatch(logout()),
    storeMyWineries: (myWineries) => dispatch(storeMyWineries(myWineries)),
    storeWineryDetails: (details, winery) => dispatch(storeWineryDetails(details, winery)),
  }
}

// see github "withRouter not working if inside redux connect #5256"
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

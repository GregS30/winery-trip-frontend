import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
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
import { login, logout, myWineries } from './actions';

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
    myWineries: () => dispatch(myWineries(myWineries))
  }
}

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
    .then(this.props.myWineries)
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
    .then(this.props.myWineries)
  }

  render() {
//    console.log(this.props.myWineries)
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
                  username={this.props.username}
                  myWineries={this.props.myWineries}
                  userId={this.props.userId}
                  saveWinery={this.saveWinery}
                />}
            />
            <Route
              exact path="/mywineries"
              render={() =>
                <TripContainer
                  myWineries={this.props.myWineries}
                  username={this.props.username}
                  saveWinery={this.saveWinery}
                />}
            />
          </Fragment>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

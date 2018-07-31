import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

//CSS
import './App.css';

//COMPONENTS
import Header from './components/Header.js';
import Navbar from './components/Navbar.js';
import WineryContainer from './containers/WineryContainer.js';
import Footer from './components/Footer.js';


class App extends Component {
  constructor () {
    super()
    this.state = {
      username: "",
      id: "",
      loggedIn: false,
      trip: [],
      winery: null,
    }
  }



  setUser = (username, id) => {
    this.setState({
      username: username,
      id: id,
      loggedIn: true,
      }, () => console.log(this.state)
    );
  }

  handleLogout = (event) => {
    this.setState({
      username: "",
      password: "",
      loggedIn: false,
      }
    );
  }

  saveWinery = (winery) => {
    console.log("winery=", winery)
    let newTrip = [...this.state.trip, winery]
//    newTrip.push(winery)

    this.setState({
      winery: winery,
      trip: newTrip,
    }, () => console.log(this.state));

  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <Header />
        <Router>
           <React.Fragment>
            <Navbar
              handleLogout={this.handleLogout}
              loggedIn={this.state.loggedIn}
              setUser={this.setUser} />
            <Route
              path="/"
              render={() =>
                <WineryContainer saveWinery={this.saveWinery}
                />}
              />
              <Route
              path="/home"
              render={() =>
                <WineryContainer saveWinery={this.saveWinery}
                />}
              />
           </React.Fragment>
         </Router>
         <Footer />
      </div>
    );
  }
}

export default App;

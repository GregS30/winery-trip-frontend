import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

//CSS
import './App.css';

//ADAPTERS
import Adapter from './adapters/Adapter'

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

  // AUTO-LOGIN functionality -if token is present in LocalStorage
  componentDidMount(){
    Adapter.getCurrentUser()
     .then(json => {
       console.log(json);
       this.setState({
           id: json.id,
           username: json.username,
           loggedIn: true,
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
      }
    );
  }
  
  //PROPS FUNCTIONALITY: WineryContainer handlers
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
    return (
      <div className="App">
        <Header />
        <Router>
           <React.Fragment>
            <Navbar
              handleLogout={this.handleLogout}
              loggedIn={this.state.loggedIn}
              setUser={this.setUser}
            />
            <Route
              path="/"
              render={() =>
                <WineryContainer 
                  saveWinery={this.saveWinery}
                  username={this.state.username}
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

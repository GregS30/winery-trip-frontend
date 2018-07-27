import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import Navbar from './components/Navbar.js';
import FilterContainer from './containers/FilterContainer.js';
import WineryContainer from './containers/WineryContainer.js';
import WineryDetailsContainer from './containers/WineryDetailsContainer.js'
import Footer from './components/Footer.js';
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
           <React.Fragment>
             <Navbar />
             <Route path="/home" component={WineryContainer} />
           </React.Fragment>
         </Router>
        <Footer />
      </div>
    );
  }
}

export default App;

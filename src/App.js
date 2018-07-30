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
      </div>
    );
  }
}

export default App;

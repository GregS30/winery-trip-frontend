import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

//COMPONENTS
import Login from './Login.js'

const Navbar = (props) => {

  return (
    <div className="navbar">
      {props.loggedIn
        ?
          <div>
            <NavLink to="/home" exact>Home</NavLink><br/>
            <NavLink to="/mytrips" exact>My Trips</NavLink><br/>
            <button onClick={props.handleLogout}>Log Out</button>
          </div>
        : <Login setUser={props.setUser} />
      }
    </div>
  )

}

export default Navbar;

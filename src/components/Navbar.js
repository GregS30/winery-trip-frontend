import React from 'react';
import { NavLink } from 'react-router-dom';

//COMPONENTS
import Login from './Login.js'

const Navbar = (props) => {

  return (
    <div className="navbar">
      {props.loggedIn
        ?
          <div>
            <NavLink to="/" exact>Home</NavLink><br/>
            <NavLink to="/mywineries" exact>My Wineries</NavLink><br/>
            <button onClick={props.handleLogout}>Log Out</button>
          </div>
        : <Login
            setUser={props.setUser}
            getMyWineries ={props.getMyWineries}
          />
      }
    </div>
  )
}

export default Navbar;

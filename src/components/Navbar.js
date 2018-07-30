import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import Login from './Login.js'

const Navbar = (props) => {

  return (
    <div className="navbar">
      <NavLink to="/home" exact>Home</NavLink>
      {props.loggedIn
        ?
          <Fragment>
            <NavLink to="/mytrips" exact>My Trips</NavLink>
            <button onClick={props.handleLogout}>Log Out</button>
          </Fragment>
        : <Login handleSubmit={props.handleSubmit} />
      }
    </div>
  )

}

export default Navbar;

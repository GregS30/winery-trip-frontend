import React, { Fragment } from 'react';
import { BrowserRouter as NavLink} from 'react-router-dom';

//COMPONENTS
import Login from './Login.js'

const Navbar = (props) => {

  return (
    <div className="navbar">
      {props.loggedIn
        ?
          <Fragment>
            <NavLink to="/home" exact>Home</NavLink>
            <NavLink to="/mytrips" exact>My Trips</NavLink>
            <button onClick={props.handleLogout}>Log Out</button>
          </Fragment>
        : <Login setUser={props.setUser} />
      }
    </div>
  )

}

export default Navbar;

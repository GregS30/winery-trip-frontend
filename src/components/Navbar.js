import React from 'react';
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

const Navbar = () => {

  return (
    <div className="navbar">
      <NavLink to="/home" exact>Home</NavLink>
      <NavLink to="/mytrips" exact>My Trips</NavLink>
      <NavLink to="/logout" exact>Log Out</NavLink>
    </div>
  )
  
}

export default Navbar;

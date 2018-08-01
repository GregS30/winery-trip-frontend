import React, { Component } from 'react';

//ADAPTERS
import { API } from '../adapters/Adapter'
import Adapter from './../adapters/Adapter'


class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  //PROPS FUNCTIONALITY: Button handlers
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`${API}/${event.target.value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(json => {
      Adapter.setToken(json.token);
      this.props.setUser(json.username, json.id);
      this.props.getMyWineries();
    })
   }

  render() {
    return (
      <div className="login">
        <form >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          />
        <button type="submit" value="sessions" onClick={(event) => this.handleSubmit(event)}>Login</button>
        <button type="submit" value="signup" onClick={(event) => this.handleSubmit(event)}>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default Login;

import React, { Component } from 'react';
import { API } from '../adapters/Adapter'

class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  // componentDidMount() {
  //   console.log(localStorage.getItem('token'));
  // }
  //
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    if (event.target.value === "sign-up") {
      fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
      })
      .then(resp => resp.json())
      .then(json => {
        console.log(json)
        localStorage.setItem('token', json.token);
        this.props.setUser(json.username, json.id);
      })
    } else if (event.target.value === "login") {
      fetch(`${API}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
      })
      .then(resp => resp.json())
      .then(
        json => {
        localStorage.setItem('token', json.token);
        this.props.setUser(json.username, json.id);
      }
    )
    }
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
        <button type="submit" value="login" onClick={(event) => this.handleSubmit(event)}>Login</button>
        Or
        <button type="submit" value="sign-up" onClick={(event) => this.handleSubmit(event)}>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default Login;

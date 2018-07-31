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
    console.log('handleSubmit');
    event.preventDefault();
    fetch(`${API}/sessions`, {
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
        this.props.setUser(json.id, json.username);
//        this.props.history.push('/recipes');
      })

   }

  render() {
    return (
      <div className="login">
        <form onSubmit={(event) => this.handleSubmit(event)}>
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
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

export default Login;

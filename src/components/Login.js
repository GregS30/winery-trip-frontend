import React, { Component } from 'react';
import { connect } from 'react-redux';

// ADAPTERS
import AdapterUser from './../adapters/AdapterUser';

// ACTIONS
import { login } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    login: (username, userId) => dispatch(login(username, userId))
  }
}

// redux props
class Login extends Component {
  // keeping local state
  state = {
    username: "",
    password: "",
  };

  //PROPS FUNCTIONALITY: Button handlers
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    AdapterUser.login(event.target.value, this.state)
      .then(json => {
        AdapterUser.setToken(json.token);
        this.props.login(json.username, json.id);
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


export default connect(null, mapDispatchToProps)(Login);

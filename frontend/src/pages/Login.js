import React, { Component } from 'react';

import './Login.css';
import twitterLogo from '../twitter.svg';

class Login extends Component {
  state = {
    username: ''
  };

  handleInputChange = event => {
    this.setState({ username: event.target.value })
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username } = this.state;

    if (!username) return;

    localStorage.setItem('@GoTwiiter:username', username);

    this.props.history.push('/timeline');
  };
  render() {
    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="ALex GO" />
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.username}
            onChange={this.handleInputChange} 
            placeholder="Usuario" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
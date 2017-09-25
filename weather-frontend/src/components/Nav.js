import React, { Component } from 'react';

//import createReactClass from 'create-react-class';
import AuthService from './AuthService';

class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {username: '', password: '', signInClicked: false, signUpClicked: false};
    this.AuthService = new AuthService();

  }

  handleUsernameChange(event) {
    console.log(event.target.value);
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSignUp(event) {
    event.preventDefault();
    this.AuthService.signUp(this.state.username, this.state.password);
  }

  handleLogIn(event) {
    event.preventDefault();
    this.AuthService.logIn(this.state.username, this.state.password);
  }

  isClicked(e) {
    if (e.target.value === 'Sign In') {
      this.setState({
        signInClicked: true,
        signUpClicked: false
      });
    } else if (e.target.value === 'Sign Up') {
      this.setState ({
        signUpClicked: true,
        signInClicked: false
      });
    }
  }

  render () {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-default navbar-fixed-top">
          <ul id="nav_pills" className="nav nav-pills" role="tablist">
            <li><button type="button" className="btn btn-primary" value="Sign In" onClick={this.isClicked.bind(this)}>Sign In</button>
            </li>
            <li><button type="button" className="btn btn-primary" value="Sign Up" onClick={this.isClicked.bind(this)}>Sign up</button></li>
          </ul>
          <form name="authForm" noValidate>
            <div className = "signUpDisplay" style={{display: this.state.signUpClicked ? 'inline' : 'none'}}>
              <input type="text" placeholder = "username" onChange={this.handleUsernameChange.bind(this)} required/>
              <input type="text" placeholder = "password" onChange={this.handlePasswordChange.bind(this)} required/>
              <input type="text" placeholder = "repeat password"/>
              <button type="submit" className = "btn btn-primary" id="signUpBtn" onClick={this.handleSignUp.bind(this)}>Submit</button>
            </div>

            <div className = "signInDisplay" style={{display: this.state.signInClicked ? 'inline' : 'none'}}>
              <input type="text" placeholder = "username" onChange={this.handleUsernameChange.bind(this)} required/>
              <input type="text" placeholder = "password" onChange={this.handlePasswordChange.bind(this)} required/>
              <button type="submit" className = "btn btn-primary" id="signInBtn" onClick={this.handleLogIn.bind(this)}>Submit</button>
            </div>
          </form>
        </nav>
      </div>
    );
  }
}

export default Nav;

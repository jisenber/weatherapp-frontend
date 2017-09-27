import React, { Component } from 'react';
import Weather from './Weather'

//import createReactClass from 'create-react-class';
import AuthService from './AuthService';

class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {username: '', password: '', signInClicked: false, signUpClicked: false, isLoggedIn: false, userHistory:[]};
    this.AuthService = new AuthService();

  }
  //updates username dynamically to state
  handleUsernameChange(event) {
    console.log(event.target.value);
    this.setState({username: event.target.value});
  }

  //updates password dynamically to state
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  //signs up the user with password and username set in state
  handleSignUp(event) {
    event.preventDefault();
    var self = this;
    self.AuthService.signUp(this.state.username, this.state.password);
    self.setState({
      signUpClicked: false,
      isLoggedIn: true
    });
  }

  handleLogIn(event) {
    event.preventDefault();
    var self = this; //takes 'this' reference the component
    self.AuthService.logIn(this.state.username, this.state.password, function(data) {
      if(data) {
        self.setState({
          isLoggedIn: true,
          userHistory: data,
          signInClicked: false,
        });
      }
    });
  }

  //changes input fields depending on whether user clicked log in or sign up
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

  //resets state back to initial state
  logout() {
    this.setState({
      isLoggedIn: false,
      userHistory: [],
      username: '',
      password: ''
    });
  }


  render () {
    return (
      <div className="container-fluid">
      <div className="navContainer">
        <nav className="navbar navbar-default navbar-fixed-top">

          <div className="authedNav"  style={{display: this.state.isLoggedIn ? 'inline': 'none'}}>
            <ul id="nav_pills" className="nav nav-pills" role="tablist">
              <li><button type="button" className="btn btn-primary" value="Log Out" onClick={this.logout.bind(this)}>Log Out</button>
              </li>
              <li>
                <div className="dropdown">
                  <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">View History</button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {this.state.history}
                </div>
              </div>
              </li>
            </ul>
          </div>

          <div className="unauthedNav" style={{display: !this.state.isLoggedIn ? 'inline': 'none'}}>
            <ul id="nav_pills" className="nav nav-pills" role="tablist">
              <li><button type="button" className="btn btn-primary" value="Sign In" onClick={this.isClicked.bind(this)}>Sign In</button>
              </li>
              <li><button type="button" className="btn btn-primary" value="Sign Up" onClick={this.isClicked.bind(this)}>Sign up</button></li>
            </ul>
          </div>

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
      <div className="weatherContainer">
        <h2 className="weatherTitle">Welcome to Weather Checker</h2><br />
      <Weather username={this.state.username} history={this.state.history}/>
      </div>
    </div>
    );
  }
}

export default Nav;

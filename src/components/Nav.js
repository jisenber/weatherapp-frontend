import React, { Component } from 'react';
import Weather from './Weather';
import {HistoryLocation, HistoryLatLng, HistoryTimeForecast} from './HistoryItem';
import AuthService from '../services/AuthService';

//valides input fields for signup functionality
function validateSignUp(username, password, passwordRepeat) {
  if(!username || !password || ! passwordRepeat ) {
    return false;
  } else if (password !== passwordRepeat) {
    return 'Passwords do not match';
  } else {
    return true;
  }
}

class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {username: '', password: '', passwordRepeat:'', signInClicked: false, signUpClicked: false, isLoggedIn: false, userHistory:[], displayHistory: false};
    this.AuthService = new AuthService();

  }

  //allows for persistence of user after page refresh
  componentDidMount() {
    if (localStorage.getItem('weatherUsername')) {
      var self = this;
      var user = localStorage.getItem('weatherUsername');
      var histArr = [];
      this.AuthService.getHistory(user, function(data) {
        while(data.length) { //reverse history array so most recent values show at top
          histArr.push(data.pop());
        }
        self.setState ({
          username: user,
          isLoggedIn: true,
          userHistory: histArr
        });
      });
    }
  }

  //View and hide history dropdown menu based on value of a state prop
  toggleDisplayHistory(event) {
    event.preventDefault();
    if(this.state.displayHistory) {
      this.setState({
        displayHistory: false
      });
    } else {
      this.setState({
        displayHistory: true
      });
    }
  }

  //updates username dynamically to state
  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  //updates password dynamically to state
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  //updates password repeat dynamically to state
  handlePasswordRepeatChange(event) {
    this.setState({passwordRepeat: event.target.value});
  }

  //signs up the user with password and username set in state
  handleSignUp(event) {
    event.preventDefault();

    //validation steps
    var validSignUp = validateSignUp(this.state.username, this.state.password, this.state.passwordRepeat);
    if(!validSignUp) {
      alert('invalid username or password');
      return;
    } else if (validSignUp === 'Passwords do not match') {
      alert('passwords do not match');
      return;
    }

    var self = this;
    self.AuthService.signUp(this.state.username, this.state.password);
    self.setState({
      signUpClicked: false,
      isLoggedIn: true
    });
  }

  //fires after user authenticates with username and password
  handleLogIn(event) {

    event.preventDefault();
    var self = this; //takes 'this' reference the component
    self.AuthService.logIn(this.state.username, this.state.password, function(data) {
      if(data) {
        var histArr = [];
        while(data.length) {
          histArr.push(data.pop());
        }
        self.setState({
          isLoggedIn: true,
          userHistory: data,
          signInClicked: false,
        });
      } //sets a value to localStorage to allow for per
      localStorage.setItem('weatherUsername', self.state.username);
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
    localStorage.removeItem('weatherUsername');

    var username = this.refs.username
    var password = this.refs.password

    this.setState({
      isLoggedIn: false,
      userHistory: [],
      username: '',
      password: ''
    });
    username.value = '';
    password.value = '';
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
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.toggleDisplayHistory.bind(this)}>View History</button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{display: this.state.displayHistory ? 'inline' : 'none'}}>
                      <ul className="historyList">
                        {
                          this.state.userHistory.map(function(item, i){
                            if(item.weatherDate) {
                              return <HistoryTimeForecast key={i} date={item.dateSearched} forecastDate={item.weatherDate.slice(0,19)} location={item.locationSearched} />
                            }
                            if(item.locationSearched.lat) {
                              return <HistoryLatLng key={i} date={item.dateSearched} lat ={item.locationSearched.lat} lng={item.locationSearched.lng}/>
                            } else {
                              return <HistoryLocation key={i} date={item.dateSearched} location={item.locationSearched}/>
                            }
                          })
                        }
                      </ul>
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

            <form name="authForm">
              <div className = "signUpDisplay" style={{display: this.state.signUpClicked ? 'inline' : 'none'}}>
                <input type="text" placeholder="username" onChange={this.handleUsernameChange.bind(this)} required/>
                <input type="password" placeholder = "password" onChange={this.handlePasswordChange.bind(this)} required/>
                <input type="password" placeholder = "repeat password" onChange={this.handlePasswordRepeatChange.bind(this)}/>
                <button type="submit" className = "btn btn-primary" id="signUpBtn" onClick={this.handleSignUp.bind(this)}>Submit</button>
              </div>

              <div className = "signInDisplay" style={{display: this.state.signInClicked ? 'inline' : 'none'}}>
                <input type="text" ref='username' placeholder = "username" onChange={this.handleUsernameChange.bind(this)} required/>
                <input type="password" ref='password' placeholder = "password" onChange={this.handlePasswordChange.bind(this)} required/>
                <button type="submit" className = "btn btn-primary" id="signInBtn" onClick={this.handleLogIn.bind(this)}>Submit</button>
              </div>
            </form>
            <div className="github">
              <span>We're open source!</span><br/>
              <a href="https://github.com/jisenber/weatherapp-frontend"><i className="fa fa-github-square fa-2x"></i></a>
            </div>
          </nav>
        </div>
        <div className="weatherContainer">
          <h2 className="weatherTitle">Welcome to Weather Checker</h2><br />
          <Weather username={this.state.username} history={this.state.userHistory} isLoggedIn={this.state.isLoggedIn} />
        </div>
      </div>
    );
  }
}

export default Nav;

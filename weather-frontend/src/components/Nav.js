import React, { Component } from 'react';

class Nav extends Component {
  constructor() {
    super();

    this.state = {
      openSignIn: false,
      openSignUp: false
    };

    // This line is important!
    this.openSignIn = this.openSignUp.bind(this);
    this.openSignUp = this.openSignIn.bind(this);
  }

  componentWillUpdate() {
    if(this.openSignUp === true) {
      document.getElementsByClassName('signUp').style.display = "inline"
    } else {
      document.getElementsByClassName('signUp').style.display = "none"
    }
    if(this.openSignIn === true) {
      document.getElementsByClassName('signIn').style.display = "inline"
    } else {
      document.getElementsByClassName('signIn').style.display = "none"
    }
  }

  render () {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-default navbar-fixed-top">
          <ul id="nav_pills" className="nav nav-pills" role="tablist">
            <li><button type="button" className="btn btn-primary" onClick="">Sign In</button>
            </li>
            <li><button type="button" className="btn btn-primary">Sign up</button></li>
          </ul>
          <form>
            <input type="text" className="signUp" placeholder="username"/>
            <input type="text" className="signIn" placeholder="password"/>
          </form>
        </nav>
      </div>
    );
  }
}

export default Nav;

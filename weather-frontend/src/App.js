import React, { Component } from 'react';
import Nav from './components/Nav'


class App extends Component {
  render() {
    return (
      <div className="App-header">
        <div>
          <h2>Welcome to Weather Checker</h2>
          </div>
          <div className='Navigation'>
            <Nav/>
          </div>

        </div>
    );
  }
}

export default App;

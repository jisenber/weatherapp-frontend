import axios from 'axios';

class AuthService {
  signUp(username, password) {
    axios({
      method: 'post',
      url: 'http://localhost:4200/signup',
      headers: {
        contentType:'application/json',
        dataType:'json'
      },
      data: {
        username: username,
        password: password
      }
    })
      .then(username => {
        console.log(`${username} added`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  logIn(username, password) {
    axios({
      method: 'post',
      url: 'http://localhost:4200/login',
      headers: {
        contentType:'application/json',
        dataType:'json'
      },
      data: {
        username: username,
        password: password
      }
    })
      .then(user => {
        console.log(`${user} logged in`);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default AuthService;

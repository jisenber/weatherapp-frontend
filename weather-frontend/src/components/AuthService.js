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

  logIn(username, password, cb) {
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
      .then(history => {
        console.log(history.data);
        cb(history.data);
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  }

  addHistoryEvent(username, params) {
    axios({
      method: 'post',
      url: 'http://localhost:4200/history',
      headers: {
        contentType:'application/json',
        dataType:'json'
      },
      data: {
        username: username,
        history: params
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default AuthService;

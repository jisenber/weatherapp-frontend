import axios from 'axios';

//var API_URL = 'http://localhost:4200'
var API_URL = 'https://allweather-backend.herokuapp.com';

class AuthService {
  signUp(username, password) {
    axios({
      method: 'post',
      url: `${API_URL}/signup`,
      headers: {
        contentType:'application/json',
        dataType:'json'
      },
      data: {
        username: username,
        password: password
      }
    })
      .then(()=> {
        console.log(`success`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  logIn(username, password, cb) {
    axios({
      method: 'post',
      url: `${API_URL}/login`,
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
        cb(history.data);
      })
      .catch(() => {
        alert('Incorrect Username or Password');
        return false;
      });
  }

  addHistoryEvent(username, params) {
    axios({
      method: 'post',
      url: `${API_URL}/history`,
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
        return response;
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  }

  getHistory(username, cb) {
    axios({
      method: 'get',
      url: `${API_URL}/history?user=${username}`
    })
      .then(response => {
        cb(response.data);
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  }
}

export default AuthService;

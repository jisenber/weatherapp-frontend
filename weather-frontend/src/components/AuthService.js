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

  // checkLogIn() {
  //   axios({
  //     method: 'get',
  //     url: 'http://localhost:4200',
  //   })
  //     .then(user => {
  //       console.log(user);
  //       return user;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
}

export default AuthService;

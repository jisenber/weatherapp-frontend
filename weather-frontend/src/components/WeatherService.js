import axios from 'axios';

class WeatherService {

  getForecast(lat, lng, user, cb) {
    axios({
      method: 'get',
      url: `http://localhost:4200/weather?lat=${lat}&lng=${lng}&user=${user}`
    })
      .then(response => {
        cb(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default WeatherService;

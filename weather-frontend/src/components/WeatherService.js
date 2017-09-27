import axios from 'axios';

class WeatherService {

  getForecast(lat, lng, cb) {
    axios({
      method: 'get',
      url: `http://localhost:4200/weather?lat=${lat}&lng=${lng}`
    })
      .then(response => {
        var dailyForecast = response.data.daily.data
        cb(dailyForecast);
      })
      .catch(err => {
        console.log(err);
      });
  }

  //using POST so req.body can be sent. Functionally this is more of a get.
  getCoordinates(location, cb) {
    axios({
      method: 'post',
      url: 'http://localhost:4200/geolocate',
      headers: {
        contentType:'application/json',
        dataType:'json'
      },
      data: {
        location: location
      }
    })
    .then(data => {
      var latLng = data.data[0].geometry.location
      cb(latLng)
    });
  }
}

export default WeatherService;

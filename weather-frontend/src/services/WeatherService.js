import axios from 'axios';

//var API_URL = 'http://localhost:4200'
var API_URL = 'https://allweather-backend.herokuapp.com';

class WeatherService {

  //gets forcast with lat and lng coordinates and provides a callback
  getForecast(lat, lng, cb) {
    axios({
      method: 'get',
      url: `${API_URL}/weather?lat=${lat}&lng=${lng}`
    })
      .then(response => {
        if(response.notFound) {
          return false;
        }
        var dailyForecast = response.data.daily.data;
        cb(dailyForecast);
      })
      .catch(() => {
        alert('location not found');
        return false;
      });
  }

  //using POST so req.body can be sent. Functionally this is more of a get.
  getCoordinates(location, cb) {
    axios({
      method: 'post',
      url: `${API_URL}/geolocate`,
      headers: {
        contentType:'application/json',
        dataType:'json'
      },
      data: {
        location: location
      }
    })
      .then(data => {
        var latLng = data.data[0].geometry.location;
        cb(latLng);
      })
      .catch(() => {
        alert('location not found');
        return false;
      });
  }

  //gets forcast specifically for calendar lookup
  getTimeForecast(lat, lng, time, cb) {
    axios({
      method: 'get',
      url: `${API_URL}?lat=${lat}&lng=${lng}&time=${time}`
    })
      .then(response => {
        var historicForecast = response.data.daily.data;
        cb(historicForecast);
      })
      .catch(() => {
        alert('invalid time');
        return false;
      });
  }
}

export default WeatherService;

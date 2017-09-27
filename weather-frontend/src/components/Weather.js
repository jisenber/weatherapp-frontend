import React, { Component } from 'react';
import WeatherService from './WeatherService';
import DailyForecast from './DailyForecast';
import AuthService from './AuthService';


class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {forecast: [], lat:'', lng:'', location:'', history:[]};
    this.weatherService = new WeatherService();
    this.authService = new AuthService();
  }


  obtainForecastData(event) {
    event.preventDefault();

    //check if logged in, if so, use service to update history
    if(this.props.isLoggedIn) {
      this.authService.addHistoryEvent(this.props.username, {locationSearched: {lat: this.state.lat, lng: this.state.lng}, dateSearched: new Date(Date.now())})
    }
    var forecastArr = [];
    var self = this;
    this.weatherService.getForecast(this.state.lat, this.state.lng, function(weather) {
      for (var key in weather) {
        forecastArr.push(weather[key]);
      }
      console.log(forecastArr);
      self.setState ({
        forecast: forecastArr,
      });
    });
  }

  obtainLocationForecast(event) {
    event.preventDefault();

    //check if logged in, if so, use service to update history
    if(this.props.isLoggedIn) {
      this.authService.addHistoryEvent(this.props.username, {locationSearched: this.state.location, dateSearched: new Date(Date.now())});
    }
    var self = this;
    this.weatherService.getCoordinates(this.state.location, function(data) {
      self.setState ({
        lat: data.lat,
        lng: data.lng
      });
      self.weatherService.getForecast(self.state.lat, self.state.lng, function(weather) {
        var forecastArr = [];
        for (var key in weather) {
          forecastArr.push(weather[key]);
        }
        console.log(forecastArr);
        self.setState ({
          forecast: forecastArr,
        });
      });
    });
  }

  handleLatChange(event) {
    this.setState({
      lat: event.target.value
    });
  }

  handleLngChange(event) {
    this.setState({
      lng: event.target.value
    });
  }

  handleCityChange(event) {
    this.setState({
      city: event.target.value
    });
  }

  handleLocationChange(event) {
    this.setState({
      location: event.target.value
    });
  }

  
  //for time machine request: format as below.
  //[YYYY]-[MM]-[DD]T[HH]:[MM]:[SS][timezone

  render() {
    return (
    <div>
      <div className="searchField">
      <form noValidate className="weatherFields">
        <h4> Search By Location </h4>
        <fieldset>
        <ul className="searchFields">
        <li>
          <label htmlFor="location-search">Location</label><br />
          <input type="text" id="location-search" placeholder="Seattle, WA" onChange={this.handleLocationChange.bind(this)}/>
        </li>
        </ul>
        </fieldset>
        <button type="submit" className="btn btn-danger" onClick={this.obtainLocationForecast.bind(this)}>Get Weather</button>
      </form>
      <h5 className="orSplitter"> OR </h5>
      <form noValidate className="weatherFields">
      <h4> Search by lat, lng </h4>
        <fieldset>
          <ul className="searchFields">
            <li>
              <label htmlFor="latitude">Latitude</label><br />
              <input type="text" id="latitude" placeholder="e.g. 42.9150747" onChange={this.handleLatChange.bind(this)}required/>
            </li>
            <li>
              <label htmlFor="longitude">Longitude</label><br />
              <input type="text" id="longitude" placeholder="e.g. -77.784323" onChange={this.handleLngChange.bind(this)} required/>
            </li>
          </ul>
        </fieldset>

        <button type="submit" className="btn btn-danger" onClick={this.obtainForecastData.bind(this)}>Get Weather</button>
      </form>
      <h5 className="orSplitter"> OR </h5>

      <form noValidate className="weatherFields">
      <h4> Search Historical Data </h4>

      </form>
    </div>
      <div className="forecastContainer" style={{display: this.state.forecast[0] ? 'inline' : 'none'}}>
        {
          this.state.forecast.map(function(item, i){
            return <DailyForecast key={i} date={item.time} summary={item.summary} icon={item.icon} high={item.temperatureHigh} low={item.temperatureLow}/>
          })
       }
    </div>
    </div>
    );
  }
}


export default Weather;

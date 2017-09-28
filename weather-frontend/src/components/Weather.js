import React, { Component } from 'react';
import WeatherService from './WeatherService';
import DailyForecast from './DailyForecast';
import AuthService from './AuthService';
import DatePicker from 'react-datepicker';
import BarChart from './BarChart'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css'
import '../style/calstyle.css' //override of some datepicker css

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {forecast: [], lat:'', lng:'', location:'', history:[], startDate: moment(), historicLocation:'', displayBarChart:false, displayHistoricChart: false, one:'', two:'', three:'', four:'', five:''};
    this.weatherService = new WeatherService();
    this.authService = new AuthService();

    this.handleDateChange = this.handleDateChange.bind(this);

  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
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
      self.setState ({
        forecast: forecastArr,
        one: forecastArr[0].temperatureHigh,
        two: forecastArr[1].temperatureHigh,
        three: forecastArr[2].temperatureHigh,
        four: forecastArr[3].temperatureHigh,
        five: forecastArr[4].temperatureHigh,
        displayBarChart:true
      });
    });
  }

  obtainLocationForecast(event) {
    event.preventDefault();

    //check if logged in, if so, use service to update history
    if(this.props.isLoggedIn) {
      this.authService.addHistoryEvent(this.props.username, {locationSearched: this.state.location, dateSearched: this.state.startDate});
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
        self.setState ({
          forecast: forecastArr,
          one: forecastArr[0].temperatureHigh,
          two: forecastArr[1].temperatureHigh,
          three: forecastArr[2].temperatureHigh,
          four: forecastArr[3].temperatureHigh,
          five: forecastArr[4].temperatureHigh,
          displayBarChart:true
        });
      });
    });
  }

  obtainHistoricForecastData(event) {
    event.preventDefault()

    if(this.props.isLoggedIn) {
      this.authService.addHistoryEvent(this.props.username, {locationSearched: this.state.historicLocation, dateSearched: new Date(Date.now()), weatherDate:this.state.startDate});
    }

    var getUnix = moment.unix((this.state.startDate._d));
    var validUnixTime = Math.floor(getUnix._i/1000000);
    var self = this
    this.weatherService.getCoordinates(this.state.historicLocation, function(data) {
      self.setState ({
        lat: data.lat,
        lng: data.lng
      });
      self.weatherService.getTimeForecast(self.state.lat, self.state.lng, validUnixTime,function(weather) {
        console.log(weather[0]);
        self.setState({
          forecast: weather,
          one: weather[0].temperatureHigh,
          two: weather[0].temperatureLow,
          displayBarChart: false,
          displayHistoricChart: true
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

  handleHistoricLocationChange(event) {
    this.setState({
      historicLocation: event.target.value
    })
  }

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

      <form className="weatherFields">
      <h4> Search Historical Data </h4>
      <fieldset>
        <ul className="searchFields">
          <li>
            <label htmlFor="historicLocation">Location</label><br />
            <input type="text" id="historicLocation" placeholder="Atlantis" onChange={this.handleHistoricLocationChange.bind(this)}required/>
          </li>
          <li>
          <label htmlFor="calendar">Date</label><br />
          <DatePicker
          id="calendar"
          selected={this.state.startDate}
          onSelect={this.handleDateChange}
          />
          </li>
          </ul>
      </fieldset>
      <button type="submit" className="btn btn-danger" onClick={this.obtainHistoricForecastData.bind(this)}>Get Weather</button>
      </form>
    </div>
      <div className="forecastContainer" style={{display: this.state.forecast[0] ? 'flex' : 'none'}}>
        { // eslint-disable-next-line
          this.state.forecast.map(function(item, i){
            while(i < 5) {
                return <DailyForecast key={i} date={item.time} summary={item.summary} high={item.temperatureHigh} low={item.temperatureLow}/>
            }
          })
       }
    </div>
    <div className = "dataViz" style={{display: this.state.displayBarChart ? 'flex' : 'none'}}>
      <BarChart  data ={[{x: 0, y:this.state.one}, {x:1, y:this.state.two}, {x:2, y:this.state.three},{x:3, y:this.state.four}, {x:4, y:this.state.five}]}/>
      <span id = "xAxisLabel">Days from Date Searched</span>
      <span id = "yAxisLabel">Temperature highs (Fahrenheit)</span>
    </div>
    <div className = "dataViz" style={{display: this.state.displayHistoricChart ? 'flex' : 'none'}}>
      <BarChart data ={[{x: 0, y:this.state.one}, {x:1, y:this.state.two}]}/>
      <span id = "xAxisLabel">High and Low (Fahrenheit)</span>
      <span id = "yAxisLabel">Temperature (Fahrenheit)</span>
    </div>

    </div>
    );
  }
}


export default Weather;

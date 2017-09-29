import React, { Component } from 'react';
import WeatherService from '../services/WeatherService';
import DailyForecast from './DailyForecast';
import AuthService from '../services/AuthService';
import DatePicker from 'react-datepicker';
import BarChart from './BarChart';
import HighLowChart from './HighLowChart';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/calstyle.css'; //override of some datepicker css

// /mm/dd/yyyy date validator
function validateCalendarDate(date) {
  var validDate = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  return validDate.test(date);
}

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {forecast: [], lat:'', lng:'', calLat:'', calLng:'', location:'', history:[], currentDate: '', startDate: moment(), historicLocation:'', displayBarChart:false, displayHistoricChart: false, one:'', two:'', three:'', four:'', five:''};
    this.weatherService = new WeatherService();
    this.authService = new AuthService();

    this.handleDateChange = this.handleDateChange.bind(this);

  }

  //Getting a reference to an abridged version of current date before component renders
  componentWillMount() {
    var curr = moment();
    var truncatedDate = curr._d.toString().slice(4,15);
    this.setState({
      currentDate: truncatedDate
    });
  }

  //fires when date on calendar is changed
  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  //obtains forcast for directly injected latitude and longitude
  obtainForecastData(event) {
    event.preventDefault();

    //check if logged in, if so, use service to update history
    if(this.props.isLoggedIn) {
      this.authService.addHistoryEvent(this.props.username, {locationSearched: {lat: this.state.lat, lng: this.state.lng}, dateSearched: this.state.currentDate});
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
        displayBarChart:true,
        displayHistoricChart: false
      });
    });
  }

  //obtains forecast data for location using Google Maps API geolocation services
  obtainLocationForecast(event) {
    event.preventDefault();

    //check if logged in, if so, use service to update history
    if(this.props.isLoggedIn) {
      this.authService.addHistoryEvent(this.props.username, {locationSearched: this.state.location, dateSearched: this.state.startDate});
    }
    var self = this;
    //gets latitude and longitude of object returned from Google Maps API and stores them in state
    this.weatherService.getCoordinates(this.state.location, function(data) {
      self.setState ({
        lat: data.lat,
        lng: data.lng
      });
      //takes recently obtainly latitude and longitude and gets forecast for those coordinates
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
          displayBarChart:true,
          displayHistoricChart: false
        });
      });
    });
  }

  //obtains a forecast for a location based on a specific calendar date. This only returns the forecast for one day rather than an array of dates
  obtainHistoricForecastData(event) {
    event.preventDefault();

    //check is user is logged in, if so, submit this search to their history
    if(this.props.isLoggedIn) {
      this.authService.addHistoryEvent(this.props.username, {locationSearched: this.state.historicLocation, dateSearched: new Date(Date.now()), weatherDate:this.state.startDate});
    }

    //date validator for the calendar forecast
    if(this.refs.calText.state.inputValue) {
      var dateInputValue = this.refs.calText.state.inputValue
      if (!validateCalendarDate(dateInputValue)) {
        alert('Invalid Date')
        return false
      }
    }

    var getUnix = moment.unix((this.state.startDate._d));
    var validUnixTime = Math.floor(getUnix._i/1000000); //formats time properly so it can go on the URL param of a Dark Sky Time Machine API request
    var self = this;
    //stores latitude and longitude coordinates of the location returned from Google Maps
    this.weatherService.getCoordinates(this.state.historicLocation, function(data) {
      self.setState ({
        calLat: data.lat,
        calLng: data.lng
      });
      self.weatherService.getTimeForecast(self.state.calLat, self.state.calLng, validUnixTime,function(weather) {
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

  //handles manual latitude input
  handleLatChange(event) {
    this.setState({
      lat: event.target.value
    });
  }

  //handles manual longitude input
  handleLngChange(event) {
    this.setState({
      lng: event.target.value
    });
  }

  //handles location input for location search (not calendar search)
  handleLocationChange(event) {
    this.setState({
      location: event.target.value
    });
  }

  //same thing as above but for the calendar search
  handleHistoricLocationChange(event) {
    this.setState({
      historicLocation: event.target.value
    });
  }

  render() {
    return (
      <div>
        <div className = "searchFieldcontainer">
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
                      ref="calText"
                    />
                  </li>
                </ul>
              </fieldset>
              <button type="submit" className="btn btn-danger" onClick={this.obtainHistoricForecastData.bind(this)}>Get Weather</button>
            </form>
          </div>
        </div>
        <div className="containerExtraordinaire">
          <div className="forecastContainer" style={{display: this.state.forecast[0] ? 'flex' : 'none'}}>
            { // eslint-disable-next-line
              this.state.forecast.map(function(item, i){
                while(i < 5) {
                  return <DailyForecast key={i} date={item.time} summary={item.summary} high={item.temperatureHigh} low={item.temperatureLow}/>
                }
              })
            }
          </div>
          <div className= "dataVizContainer">
            <div className = "dataViz" style={{display: this.state.displayBarChart ? 'flex' : 'none'}}>
              <BarChart data={[{x:0, y:this.state.one}, {x:1, y:this.state.two}, {x:2, y:this.state.three},{x:3, y:this.state.four}, {x:4, y:this.state.five}]}/>
              <span id = "xAxisLabel">Days from {this.state.currentDate}</span>
              <span id = "yAxisLabel">Temperature highs (Fahrenheit)</span>
            </div>

            <div className = "dataViz" style={{display: this.state.displayHistoricChart ? 'flex' : 'none'}}>
              <HighLowChart data ={[{x:'high', y:this.state.one}, {x:'low', y:this.state.two}]}/>
              <span id = "xHighLowAxis">High and Low </span>
              <span id = "yHighLowAxis">Temperature (Fahrenheit)</span>
            </div>
          </div>
        </div>

      </div>
    );
  }
}


export default Weather;

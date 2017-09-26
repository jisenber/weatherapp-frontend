import React, { Component } from 'react';
import WeatherService from './WeatherService';
//import { GoogleApiWrapper } from 'google-maps-react'
//import MapContainer from './MapContainer'

//import GoogleMapReact from 'google-maps-react';

//import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {forecast: {}, lat:'', lng:'', city:'', history:[]};
    this.weatherService = new WeatherService();
  }

  componentWillMount () {
    console.log('mouting');
    this.setState({
      history: this.props.history
    });
  }


  obtainForecastData(event) {
    event.preventDefault()
    this.weatherService.getForecast(this.state.lat, this.state.lng, function(data) {
      console.log(data.body);
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


  render() {
    return (
      <div className="searchField">
      <form noValidate id="weatherFields">
        <fieldset>
          <ul className="searchFields">
          <li>
            <label htmlFor="city-search">City Name</label><br />
            <input type="text" id="city-search" placeholder="e.g. Seattle, WA" onChange={this.handleCityChange.bind(this)}/>
          </li>
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
    </div>
    );
  }
}

export default Weather;

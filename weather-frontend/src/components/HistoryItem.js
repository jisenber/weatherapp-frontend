import React, { Component } from 'react';

export class HistoryLocation extends Component {
  render() {
    return (
      <li className="historyListItem"><b>Search Date:</b> {new Date(this.props.date).toLocaleString()} <br/> <b>location:</b> {this.props.location}</li>
    );
  }
}

export class HistoryLatLng extends Component {
  render() {
    return (
      <li className="historyListItem"><b>Search Date:</b> {new Date(this.props.date).toLocaleString()} <br/> <b>location: </b>lat: {this.props.lat}, lng: {this.props.lng} </li>
    );
  }
}

export class HistoryTimeForecast extends Component {
  render() {
    return (
      <li className="historyListItem"><b>Search Date:</b> {new Date(this.props.date).toLocaleString()} <br/> <b>location: </b>{this.props.location} <br /><b>Weather Date:</b> {this.props.forecastDate} </li>
    );
  }
}

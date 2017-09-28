import React, { Component } from 'react';


class DailyForecast extends Component {
  render() {
    return (
      <div className="forecastBox">
        <ul>
          <li className="forecastDate"><b>{new Date((this.props.date)*1000).toGMTString().substr(0,17)}</b></li>
          <li className="forecastSummary">{this.props.summary}</li>
          <li className="forecastIcon">{this.props.icon}</li>
          <li className="forecastHigh">High: {this.props.high}</li>
          <li className="forecastLow">Low: {this.props.low}</li>
        </ul>
      </div>
    );
  }
}
export default DailyForecast;

//Multiply by 9, then divide by 5, then add 32

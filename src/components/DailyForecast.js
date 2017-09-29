import React, { Component } from 'react';


class DailyForecast extends Component {
  render() {
    var hotStyle = {
      color: 'red'
    }
    var coldStyle = {
      color: 'blue'
    }

    return (
      <div className="forecastBox">
        <ul>
          <li className="forecastDate"><b>{new Date((this.props.date)*1000).toGMTString().substr(0,17)}</b></li>
          <li className="forecastSummary">{this.props.summary}</li>
          <li className="forecastIcon">{this.props.icon}</li>
          <li className="forecastHigh" style={hotStyle}><b>High:</b> {this.props.high}</li>
          <li className="forecastLow"style={coldStyle}><b>Low:</b> {this.props.low}</li>
        </ul>
      </div>
    );
  }
}
export default DailyForecast;

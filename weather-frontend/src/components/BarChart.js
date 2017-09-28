import React, { Component } from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';

class BarChart extends Component {
  render () {
    return (
      <XYPlot
        width={500}
        height={300}>
        <HorizontalGridLines />
        <VerticalBarSeries
          data={this.props.data}/>
        <XAxis tickValues={this.props.ticks}/>
        <YAxis />
      </XYPlot>
    )
  }
}

export default BarChart

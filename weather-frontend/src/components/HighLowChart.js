import React, { Component } from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';


class HighLowChart extends Component {
  render () {
    return (
      <XYPlot
      xType="category"
      width={400}
      height={300}
      yDomain = {[0,100]}
      margin={{left: 100, right: 100}}
      >
        <HorizontalGridLines />
        <VerticalBarSeries
          data={this.props.data}/>
        <XAxis/>
        <YAxis left={-100}/>
      </XYPlot>
    )
  }
}

export default HighLowChart

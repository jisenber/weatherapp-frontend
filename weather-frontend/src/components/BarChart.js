import React, { Component } from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';

class BarChart extends Component {
  render () {
    return (
      <XYPlot
        width={500}
        height={300}
        xDomain ={[0,4]}
        yDomain = {[0,100]}
      >
        <HorizontalGridLines />
        <VerticalBarSeries
          data={this.props.data}/>
        <XAxis tickValues = {[0,1,2,3,4]}/>
        <YAxis/>
      </XYPlot>
    );
  }
}

export default BarChart

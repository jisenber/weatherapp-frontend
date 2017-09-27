import React, { Component } from 'react';

class HistoryItem extends Component {
  render() {
    return (
      <li className="historyListItem"><b>date:</b> {new Date(this.props.date).toLocaleString()} <br/> <b>location:</b> {this.props.location}</li>
    );
  }
}
export default HistoryItem;

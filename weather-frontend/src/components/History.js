import React, { Component } from 'react';

class HistoryItem extends Component {
  render() {
    return (
      <div className="historyBox">
        <ul>
          <li className="historyList">{this.props.history}</li>
        </ul>
      </div>
    );
  }
}
export default HistoryItem;

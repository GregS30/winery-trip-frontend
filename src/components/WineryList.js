import React, { Component } from 'react';

class WineryList extends Component {
  renderWineries = () => {
    return this.props.wineries.map(winery => {
      return (
        <p key={winery.id}>{winery.name}</p>
      )
    })
  }
  render() {
    return (
      <div className="winery-list">
        {this.renderWineries()}
      </div>
    )
  }
}

export default WineryList;

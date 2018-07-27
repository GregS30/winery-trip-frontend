import React, { Component } from 'react';

class WineryList extends Component {
  renderWineries = () => {
    return this.props.wineries.map(winery => {
      return (
        <li key={winery.id}>{winery.name}</li>
      )
    })
  }
  render() {
    console.log(this.props)
    return (
      <div className="winery-list">
        {this.renderWineries()}
      </div>
    )
  }
}

export default WineryList;

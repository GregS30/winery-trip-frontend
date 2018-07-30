import React, { Component } from 'react';

class WineryList extends Component {

  renderWineries = () => {
    if (this.props.wineries) {
    return this.props.wineries.map(winery => {
      return (
        <p
          key={winery.id}
          onClick={(e) => this.props.handleClick(e, winery)}
        >{winery.name}</p>

      )
    })
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        <div>
          <h3 className="winery-header">Wineries</h3>
        </div>
        <div className="winery-list">
        {this.renderWineries()}
        </div>
      </div>
    )
  }
}

export default WineryList;

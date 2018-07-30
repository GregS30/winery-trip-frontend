import React, { Component } from 'react';

class WineryList extends Component {
  
  renderWineries = () => {
    if (this.props.wineries) {
    return this.props.wineries.map(winery => {
      return (
        <li 
          key={winery.id}
          onClick={(e) => this.props.handleClick(e,winery)}
        >{winery.name}</li>
      )
    })
    } else {
      return null
    }
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

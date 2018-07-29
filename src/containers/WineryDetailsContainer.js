import React, { Component } from 'react';

class WineryDetailsContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return this.props.displayedWinery ?
      <div className="winery-details-container">
        <h1>{this.props.displayedWinery["name"]}</h1>
        <p>{this.props.displayedWinery["formatted_address"]}</p>
      </div>
    :
    null
  }
}

export default WineryDetailsContainer;

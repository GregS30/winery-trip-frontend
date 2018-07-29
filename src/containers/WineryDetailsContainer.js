import React, { Component } from 'react';
import MapWithAMarker from '../components/MapWithAMarker'

class WineryDetailsContainer extends Component {
  
  render() {
    console.log(this.props.displayedWinery)
    return this.props.displayedWinery ?
      <div className="winery-details-container">
        <h1>{this.props.displayedWinery["name"]}</h1>
        <p>{this.props.displayedWinery["formatted_address"]}</p>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1-4iAJOvlDv3Iw92XW4Xj7ldZOxa9MuY&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `200px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          displayedWinery={this.props.displayedWinery}
        />
  
      </div>
    :
    null
  }
}

export default WineryDetailsContainer;

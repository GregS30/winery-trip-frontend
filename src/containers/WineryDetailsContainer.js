import React, { Component } from 'react';
import MapWithAMarker from '../components/MapWithAMarker'

class WineryDetailsContainer extends Component {
  
  getPhotos = () => this.props.displayedWinery.photos.map( photo => {
    return( 
      <img 
        key={photo.photo_reference}
        className="winery-img"
        src={`https://maps.googleapis.com/maps/api/place/photo?maxheight=150&photoreference=${photo.photo_reference}&key=AIzaSyAbNf1uErgPzc7WK1tfAMshs23v1pTOQRs`}
        alt="{this.props.displayedWinery.name}"
      />
    )
  }
  )

  render() {
    return this.props.displayedWinery ?
      <div className="winery-details-container">
        <h1>{this.props.displayedWinery["name"]}</h1>
        <p>{this.props.displayedWinery["formatted_address"]}</p>
        <div className="carrousel">
         {this.getPhotos()}
        </div>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1-4iAJOvlDv3Iw92XW4Xj7ldZOxa9MuY&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `200px`}} />}
          mapElement={<div style={{ height: `100%`, width:`600px` }} />}
          lat={this.props.displayedWinery.geometry.location.lat}
          lng={this.props.displayedWinery.geometry.location.lng}
        />
      </div>
    :
    null
  }
}

export default WineryDetailsContainer;

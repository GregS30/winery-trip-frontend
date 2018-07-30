import React, { Component, Fragment } from 'react';
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

  renderHeader = () => (
    this.props.winery
    ? <Fragment>
        <h1>{this.props.winery["name"]}</h1>
        <button onClick={() => this.props.saveWinery(this.props.winery)}>Add to Trip</button>
      </Fragment>
    : <div className="empty-detail-container"> <h3>Find Your Winery </h3></div>
  )

  renderDetails = () =>
      <Fragment>
        <p>{this.props.displayedWinery["formatted_address"]}</p>
        <div className="carrousel">
          {this.props.displayedWinery.photos ? this.getPhotos() : null}
        </div>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1-4iAJOvlDv3Iw92XW4Xj7ldZOxa9MuY&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `200px`}} />}
          mapElement={<div style={{ height: `100%`, width:`600px` }} />}
          lat={this.props.displayedWinery.geometry.location.lat}
          lng={this.props.displayedWinery.geometry.location.lng}
        />
        </Fragment>

  render() {
    return (
      <div className="winery-details-container">
        {this.renderHeader()}
        {this.props.displayedWinery
          ? this.renderDetails()
          : null
        }
      </div>
    )
  }
}

export default WineryDetailsContainer;

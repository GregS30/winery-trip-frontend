import React, { Component, Fragment } from 'react';
import UUID from 'uuid';

//COMPONENTS
import MapWithAMarker from '../components/MapWithAMarker';
import WinesList from '../components/WinesList';

class WineryDetailsContainer extends Component {

  renderHeader = () => this.props.winery
    ? <Fragment>
        <h1>
        {
          this.props.displayedWinery
          ? this.props.displayedWinery["name"]
          : this.props.winery["name"]
        }
        </h1>
        <button onClick={() =>
          this.props.saveWinery(this.props.winery)}>
          Add to My Wineries</button>
      </Fragment>
    : <div className="empty-detail-container"> <h3>Find Your Winery </h3></div>

  // this is not implemented yet!!!!!
  renderBtn = () => this.props.myWineries.includes (this.props.displayedWinery)
      ? <button onClick={() => this.props.saveWinery(this.props.winery)}>Add to My Wineries</button>
      : <button onClick={() => this.props.removeWinery(this.props.winery)}>Remove from My Wineries</button>

  renderOpened = () => this.props.displayedWinery && this.props.displayedWinery["opening_hours"]
    ? this.props.displayedWinery["opening_hours"]["opened_now"]
        ? <h3>Opened Now</h3>
        : <h3>Closed Now</h3>
    : null

  renderNoInfo = () => this.props.winery
    ? !this.props.displayedWinery
      ? <h3>Sorry, there is no available information for this winery at this time.</h3>
      : null
    :null

  renderSchedule = () => this.props.displayedWinery && this.props.displayedWinery["opening_hours"] && this.props.displayedWinery["opening_hours"]
  ? this.props.displayedWinery["opening_hours"]["weekday_text"]
      ? <Fragment>
          <h3> Schedule </h3>
          {this.props.displayedWinery["opening_hours"]["weekday_text"].map((day) => <p key={UUID()}>{day}</p>)}
        </Fragment>
      : null
  : null

  renderAddress = () => this.props.displayedWinery
    ? <p>Address: {this.props.displayedWinery["formatted_address"]}</p>
    : null

  getPhotos = () => this.props.displayedWinery.photos.map( photo => {
    return(
      <img
        key={photo.photo_reference}
        className="winery-img"
        src={`https://maps.googleapis.com/maps/api/place/photo?maxheight=150&photoreference=${photo.photo_reference}&key=AIzaSyAbNf1uErgPzc7WK1tfAMshs23v1pTOQRs`}
        alt="{this.props.displayedWinery.name}"
      />
    )
  })

  renderPhotos = () => this.props.displayedWinery
    ? <div className="carrousel">
        {this.props.displayedWinery.photos ? this.getPhotos() : null}
      </div>
    : null

  renderMap = () =>  this.props.displayedWinery
    ? <MapWithAMarker
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1-4iAJOvlDv3Iw92XW4Xj7ldZOxa9MuY&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `200px`}} />}
      mapElement={<div style={{ height: `100%`, width:`600px` }} />}
      lat={this.props.displayedWinery.geometry.location.lat}
      lng={this.props.displayedWinery.geometry.location.lng}
    />
    : null

    renderWines = () => this.props.winery
      ? <WinesList winery={this.props.winery.id} />
      : null

  render() {
    return (
      <div className="winery-details-container">
        <div className="winery-details-container">
          {this.renderHeader()}
          {this.renderAddress()}
          {this.renderPhotos()}
          {this.renderOpened()}
          {this.renderSchedule()}
          {this.renderMap()}
          {this.renderWines()}
          {this.renderNoInfo()}

        </div>
        <div>
        </div>
      </div>

    )
  }
}

export default WineryDetailsContainer;

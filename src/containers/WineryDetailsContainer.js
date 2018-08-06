import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import UUID from 'uuid';

//COMPONENTS
import MapWithAMarker from '../components/MapWithAMarker';
import WinesList from '../components/WinesList';

class WineryDetailsContainer extends Component {

  renderHeader = () => this.props.selectedWinery
    ? <Fragment>
        <h1>
        {
          this.props.wineryDetails
          ? this.props.wineryDetails["name"]
          : this.props.selectedWinery["name"]
        }
        </h1>
        <button onClick={() =>
          this.props.saveWinery(this.props.winery)}>
          Add to My Wineries</button>
      </Fragment>
    : <div className="empty-detail-container"> <h3>Find Your Winery </h3></div>

  // this is not implemented yet!!!!!
  renderBtn = () => this.props.myWineries.includes (this.props.wineryDetails)
      ? <button onClick={() => this.props.saveWinery(this.props.selectedWinery)}>Add to My Wineries</button>
      : <button onClick={() => this.props.removeWinery(this.props.selectedWinery)}>Remove from My Wineries</button>

    renderOpened = () => this.props.wineryDetails && this.props.wineryDetails["opening_hours"]
    ? this.props.wineryDetails["opening_hours"]["opened_now"]
        ? <h3>Opened Now</h3>
        : <h3>Closed Now</h3>
    : null

  renderNoInfo = () => this.props.selectedWinery
    ? !this.props.wineryDetails
      ? <h3>Sorry, there is no available information for this winery at this time.</h3>
      : null
    :null

  renderSchedule = () => this.props.wineryDetails && this.props.wineryDetails["opening_hours"] && this.props.wineryDetails["opening_hours"]
  ? this.props.wineryDetails["opening_hours"]["weekday_text"]
      ? <Fragment>
          <h3> Schedule </h3>
          {this.props.wineryDetails["opening_hours"]["weekday_text"].map((day) => <p key={UUID()}>{day}</p>)}
        </Fragment>
      : null
  : null

  renderAddress = () => this.props.wineryDetails
    ? <p>Address: {this.props.wineryDetails["formatted_address"]}</p>
    : null

  getPhotos = () => this.props.wineryDetails.photos.map( photo => {
    return(
      <img
        key={photo.photo_reference}
        className="winery-img"
        src={`https://maps.googleapis.com/maps/api/place/photo?maxheight=150&photoreference=${photo.photo_reference}&key=AIzaSyAbNf1uErgPzc7WK1tfAMshs23v1pTOQRs`}
        alt="{this.props.wineryDetails.name}"
      />
    )
  })

  renderPhotos = () => this.props.wineryDetails
    ? <div className="carrousel">
        {this.props.wineryDetails.photos ? this.getPhotos() : null}
      </div>
    : null

  renderMap = () =>  this.props.wineryDetails
    ? <MapWithAMarker
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1-4iAJOvlDv3Iw92XW4Xj7ldZOxa9MuY&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `200px`}} />}
      mapElement={<div style={{ height: `100%`, width:`600px` }} />}
      lat={this.props.wineryDetails.geometry.location.lat}
      lng={this.props.wineryDetails.geometry.location.lng}
    />
    : null

  renderWines = () => this.props.selectedWinery
    ? <WinesList winery={this.props.selectedWinery.id} />
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

const mapStateToProps = state => {
  return {
    wineryDetails: state.wineryDetails,
    selectedWinery: state.selectedWinery,
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WineryDetailsContainer);

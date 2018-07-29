import React from 'react'
const { compose } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");

const MapWithAMarker = compose(
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultTitle="YOUR WINERY"
    defaultZoom={15}
    defaultCenter={{ lat: props.displayedWinery.geometry.location.lat, lng: props.displayedWinery.geometry.location.lng }}
  >
    <Marker
      position={{ lat: props.displayedWinery.geometry.location.lat, lng: props.displayedWinery.geometry.location.lng }}
    />
  </GoogleMap>
);

export default MapWithAMarker;
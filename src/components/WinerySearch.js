import React, { Component } from 'react';

const WinerySearch = (props) => {
  return (
    <div className="winery-search">
      <label htmlFor="winerySearchInput">Wineries: </label>
      <input
        type="text"
        name="winerySearchInput"
        value={props.winerySearchInput}
        onChange={(event) => props.handleSearchInputChange(event)}
        />
    </div>
  )
}

export default WinerySearch;

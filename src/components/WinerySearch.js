import React from 'react';

const WinerySearch = (props) => {
  return (
    <div className="winery-search">
      <label htmlFor="winerySearchInput"></label>
      <input
        type="text"
        name="winerySearchInput"
        value={props.winerySearchInput}
        placeholder="Search by winery name"
        onChange={(event) => props.handleSearchInputChange(event)}
        />
    </div>
  )
}

export default WinerySearch;

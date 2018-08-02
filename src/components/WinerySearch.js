import React from 'react';

const WinerySearch = (props) => {
  return (
    <div className="winery-search">
      <label htmlFor="nameSearch"></label>
      <input
        type="text"
        name="nameSearch"
        value={props.nameSearch}
        placeholder="Search by winery name"
        onChange={(event) => props.handleNameSearch(event)}
        />
    </div>
  )
}

export default WinerySearch;

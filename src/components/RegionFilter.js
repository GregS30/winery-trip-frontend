import React from 'react';

const RegionFilter = (props) => {

  return (
    <div className="region-filter">
      <label htmlFor="region-filter">Region: </label>
      <select
        name="region-filter"
        value={props.selectedRegion}
        onChange={props.handleRegionSelect}
      >
      {props.regions.map(region =>
          <option key={region.id}>{region.name}</option>
      )}
      </select>
    </div>
  )
}

export default RegionFilter;

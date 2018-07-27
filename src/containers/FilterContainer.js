import React, { Component } from 'react';
import WinerySearch from '../components/WinerySearch.js';
import GrapeFilter from '../components/GrapeFilter.js';
import RegionFilter from '../components/RegionFilter.js';

class FilterContainer extends Component {
  render() {
    return (
      <div className="filter-container">
        <WinerySearch winerySearchInput={this.props.winerySearchInput} handleSearchInputChange={this.props.handleSearchInputChange}/>
        <GrapeFilter />
        <RegionFilter renderRegions={this.props.renderRegions}/>
      </div>
    )
  }
}

export default FilterContainer;

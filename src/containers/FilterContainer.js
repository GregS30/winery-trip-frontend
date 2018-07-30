import React, { Component } from 'react';

//COMPONENTS
import WinerySearch from '../components/WinerySearch.js';
import GrapeFilter from '../components/GrapeFilter.js';
import RegionFilter from '../components/RegionFilter.js';

class FilterContainer extends Component {
  render() {
    return (
      <div className="filter-container">
        <WinerySearch winerySearchInput={this.props.winerySearchInput} handleSearchInputChange={this.props.handleSearchInputChange}/>
        <GrapeFilter 
          renderGrapes={this.props.renderGrapes}
          handleGrapeSelect={this.props.handleGrapeSelect}
        />
        <RegionFilter renderRegions={this.props.renderRegions}/>
      </div>
    )
  }
}

export default FilterContainer;

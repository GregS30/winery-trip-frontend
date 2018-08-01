import React, { Component, Fragment } from 'react';

//COMPONENTS
import WinerySearch from '../components/WinerySearch.js';
import GrapeFilter from '../components/GrapeFilter.js';
import RegionFilter from '../components/RegionFilter.js';


class FilterContainer extends Component {

  render() {
    return (
      <Fragment>
        {this.props.username
          ? <h3>Welcome, {this.props.username.charAt(0).toUpperCase() + this.props.username.slice(1)}. Find your winery</h3>
          : <h3>Find your winery</h3>
        }
        <div className="filter-container">
          <WinerySearch winerySearchInput={this.props.winerySearchInput} handleSearchInputChange={this.props.handleSearchInputChange}/>
          <RegionFilter 
            renderRegions={this.props.renderRegions}
            handleRegionSelect={this.props.handleRegionSelect}
            selectedRegion={this.props.selectedRegion}
          />
          <GrapeFilter 
            renderGrapes={this.props.renderGrapes}
            handleGrapeSelect={this.props.handleGrapeSelect}
            selectedGrape={this.props.selectedGrape}
          />
        </div>
      </Fragment>
    )
  }
}

export default FilterContainer;

import React, { Component, Fragment } from 'react';

//COMPONENTS
import WinerySearch from '../components/WinerySearch.js';
import GrapeFilter from '../components/GrapeFilter.js';
import RegionFilter from '../components/RegionFilter.js';

//ADAPTERS
import AdapterWine from './../adapters/AdapterWine'

class FilterContainer extends Component {

  state = {
    grapes: [],
    regions: [],
  }

  componentDidMount() {
    AdapterWine.fetchFilters()
    .then(filters => this.setState({
      grapes: filters.grapes,
      regions: filters.regions,
    }))
  }

  render() {
    return (
      <Fragment>
        {this.props.username
          ? <h3>Welcome, {this.props.username.charAt(0).toUpperCase() + this.props.username.slice(1)}. Find your winery</h3>
          : <h3>Find your winery</h3>
        }
        <div className="filter-container">
          <WinerySearch nameSearch={this.props.nameSearch} handleNameSearch={this.props.handleNameSearch}/>
          <RegionFilter
            regions={this.state.regions}
            handleRegionSelect={this.props.handleRegionSelect}
            selectedRegion={this.props.selectedRegion}
          />
          <GrapeFilter
            grapes={this.state.grapes}
            handleGrapeSelect={this.props.handleGrapeSelect}
            selectedGrape={this.props.selectedGrape}
          />
        </div>
      </Fragment>
    )
  }
}

export default FilterContainer;

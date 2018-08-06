import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

//COMPONENTS
import WinerySearch from '../components/WinerySearch.js';
import GrapeFilter from '../components/GrapeFilter.js';
import RegionFilter from '../components/RegionFilter.js';

//ADAPTERS
import AdapterWine from './../adapters/AdapterWine'

import { storeSelectedGrape, storeSelectedRegion, storeNameSearch } from '../actions';

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

  handleNameSearch = (event) => {
    this.props.storeNameSearch(event.target.value)
  }

  handleGrapeSelect = (event) => {
    this.props.storeSelectedGrape(event.target.value);
  }

  handleRegionSelect = (event) => {
    this.props.storeSelectedRegion(event.target.value);
  }

  render() {
    return (
      <Fragment>
        {this.props.username
          ? <h3>Welcome, {this.props.username.charAt(0).toUpperCase() + this.props.username.slice(1)}. Find your winery</h3>
          : <h3>Find your winery</h3>
        }
        <div className="filter-container">
          <WinerySearch nameSearch={this.props.nameSearch} handleNameSearch={this.handleNameSearch}
          />
          <RegionFilter
            regions={this.state.regions}
            handleRegionSelect={this.handleRegionSelect}
            selectedRegion={this.props.selectedRegion}
          />
          <GrapeFilter
            grapes={this.state.grapes}
            handleGrapeSelect={this.handleGrapeSelect}
            selectedGrape={this.props.selectedGrape}
          />
        </div>
      </Fragment>
    )
  }
}

// redux props
const mapStateToProps = state => {
  return {
    username: state.username,
    selectedGrape: state.selectedGrape,
    selectedRegion: state.selectedRegion,
    nameSearch: state.nameSearch,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeNameSearch: (nameSearch) => dispatch(storeNameSearch(nameSearch)),
    storeSelectedGrape: (selectedGrape) => dispatch(storeSelectedGrape(selectedGrape)),
    storeSelectedRegion: (selectedRegion) => dispatch(storeSelectedRegion(selectedRegion)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer);

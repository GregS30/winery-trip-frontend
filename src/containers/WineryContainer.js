import React, { Component } from 'react';
import { connect } from 'react-redux';


//ADAPTERS
import AdapterWine from './../adapters/AdapterWine'

//COMPONENTS
import WineryList from '../components/WineryList.js';
import WineryDetailsContainer from './WineryDetailsContainer';
import FilterContainer from './FilterContainer';


// ACTIONS
import { allWineries, wineryDetails, selectedGrape, selectedRegion, nameSearch, selectedWinery } from '../actions';

// redux props
const mapStateToProps = state => {
  return {
    username: state.username,
    userId: state.userId,
    loggedIn: state.loggedIn,
    myWineries: state.myWineries,
    wineries: state.wineries,
    nameSearch: state.nameSearch,
    wineryDetails: state.wineryDetails,
    selectedGrape: state.selectedGrape,
    selectedRegion: state.selectedRegion,
    selectedWinery: state.selectedWinery,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    allWineries: (allWineries) => dispatch(allWineries(allWineries)),
    nameSearch: (nameSearch) => dispatch(nameSearch(nameSearch)),
    selectedGrape: (selectedGrape) => dispatch(selectedGrape(selectedGrape)),
    selectedRegion: (selectedRegion) => dispatch(selectedRegion(selectedRegion)),
    wineryDetails: (wineryDetails) => dispatch(wineryDetails(wineryDetails)),
    selectedWinery: (selectedWinery) => dispatch(selectedWinery(selectedWinery)),
  }
}

class WineryContainer extends Component {
  state = {
    regions: [],
    grapes: [],

    winery: null,
  }

  //INITIAL SETUP
  componentDidMount() {
    this.getWineries();
    this.getRegions();
    this.getGrapes();
  }
  //Data for initial setup
  getWineries = () => {
    AdapterWine.fetchWineries(this.props.selectedRegion, this.props.selectedGrape)
    .then(resp => resp.sort((w1, w2) => {return w1.name.localeCompare(w2.name)}))
    .then(this.props.allWineries)
  }

  getRegions = () => {
    AdapterWine.fetchRegions()
    .then(resp => resp.sort((w1, w2) => {return w1.name.localeCompare(w2.name)}))
    .then(regions => this.setState({
      regions,
    }))
  }

  getGrapes = () => {
    AdapterWine.fetchGrapes()
    .then(resp => resp.sort((w1, w2) => {return w1.name.localeCompare(w2.name)}))
    .then(grapes => this.setState({
      grapes,
    }))
  }

  //AC.Note: This is interesting. I'd move this function to FilterContainer and pass state regions to it instead.
  renderRegions = () => {
    return this.state.regions.map(region => {
      return (
        <option key={region.id}>{region.name}</option>
      )
    })
  }

  renderGrapes = () => {
    return this.state.grapes.map(grape => {
      return (
        <option key={grape.id}>{grape.name}</option>
      )
    })
  }

  //PROPS FUNCTIONALITY: NavBar handlers
  handleNameSearch = (event) => {
    this.props.nameSearch(event.target.value)
  }

  handleGrapeSelect = (event) => {
    this.props.selectedGrape(event.target.value)
  }

  handleRegionSelect = (event) => {
    this.props.selectedRegion(event.target.value)
  }

  //PROPS FUNCTIONALITY: WineryList handlers
  handleClick = (e, selectedWinery) => {
    AdapterWine.fetchWineryDetails(selectedWinery.name)
    .then(json => {
      if (json["message"]) {
        this.props.wineryDetails(null)
        this.props.selectedWinery(selectedWinery)
      }
      else {
        this.props.wineryDetails(json)
        this.props.selectedWinery(selectedWinery)
      }
    })
  }

  filterWineriesByName = () => {
    if (this.props.wineries) {
      const filteredWineries = this.props.wineries.filter(winery => {
        return winery.name.toLowerCase().includes(this.props.nameSearch.toLowerCase())
      })
      return filteredWineries
    }
    else {
      return null
    }
  }

  render() {
    return (
      <div className="container">
        <div className="filter">
          <FilterContainer
            username={this.props.username}
            renderRegions={this.renderRegions}
            renderGrapes={this.renderGrapes}
            handleNameSearch={this.handleNameSearch}
            nameSearch={this.state.nameSearch}
            handleGrapeSelect={this.handleGrapeSelect}
            handleRegionSelect={this.handleRegionSelect}
            selectedGrape={this.state.selectedGrape}
            selectedRegion={this.state.selectedRegion}
          />
        </div>
        <div className="list-and-details">
          <WineryList
            wineries={this.filterWineriesByName()}
            handleClick={this.handleClick}
          />
          <WineryDetailsContainer
            displayedWinery={this.state.displayedWinery}
            winery={this.state.winery}
            myWineries={this.props.myWineries}
            userId={this.props.userId}
            saveWinery={this.props.saveWinery}
          />

        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WineryContainer);

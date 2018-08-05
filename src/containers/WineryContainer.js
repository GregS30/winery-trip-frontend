import React, { Component } from 'react';
import { connect } from 'react-redux';

//ADAPTERS
import AdapterWine from './../adapters/AdapterWine'

//COMPONENTS
import WineryList from '../components/WineryList.js';
import WineryDetailsContainer from './WineryDetailsContainer';
import FilterContainer from './FilterContainer';

// ACTIONS
import { storeWineries, storeWineryDetails, storeSelectedGrape, storeSelectedRegion, storeNameSearch, storeSelectedWinery } from '../actions';

// redux props
const mapStateToProps = state => {
  console.log("mapStateToProps")
  return {
    username: state.username,
    userId: state.userId,
    loggedIn: state.loggedIn,
    wineries: state.wineries,
    myWineries: state.myWineries,
    nameSearch: state.nameSearch,
    wineryDetails: state.wineryDetails,
    selectedGrape: state.selectedGrape,
    selectedRegion: state.selectedRegion,
    selectedWinery: state.selectedWinery,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeWineries: (wineries) => dispatch(storeWineries(wineries)),
    storeNameSearch: (nameSearch) => dispatch(storeNameSearch(nameSearch)),
    storeSelectedGrape: (selectedGrape) => dispatch(storeSelectedGrape(selectedGrape)),
    storeSelectedRegion: (selectedRegion) => dispatch(storeSelectedRegion(selectedRegion)),
    storeWineryDetails: (wineryDetails) => dispatch(storeWineryDetails(wineryDetails)),
    storeSelectedWinery: (selectedWinery) => dispatch(storeSelectedWinery(selectedWinery)),
  }
}

class WineryContainer extends Component {
  state = {
    regions: [],
    grapes: [],
  }

  //INITIAL SETUP
  componentDidMount() {
    this.getWineries();
  }

  //Data for initial setup
  getWineries = () => {
    AdapterWine.fetchWineries(this.props.selectedRegion, this.props.selectedGrape)
    .then((resp) =>
      this.props.storeWineries(resp)
    );
  }

  //PROPS FUNCTIONALITY: NavBar handlers
  handleNameSearch = (event) => {
    this.props.storeNameSearch(event.target.value)
  }

  handleGrapeSelect = (event) => {
    this.props.storeSelectedGrape(event.target.value);
    this.getWineries();
  }

  handleRegionSelect = (event) => {
    this.props.storeSelectedRegion(event.target.value);
    console.log("region select")
    this.getWineries();
  }

  //PROPS FUNCTIONALITY: WineryList handlers
  handleClick = (e, selectedWinery) => {
    AdapterWine.fetchWineryDetails(selectedWinery.name)
    .then(json => {
      if (json["message"] === "No Data") {
        this.props.storeWineryDetails(null)
        this.props.storeSelectedWinery(selectedWinery)
      }
      else {
        this.props.storeWineryDetails(json)
        this.props.storeSelectedWinery(selectedWinery)
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
            handleNameSearch={this.handleNameSearch}
            nameSearch={this.props.nameSearch}
            handleGrapeSelect={this.handleGrapeSelect}
            handleRegionSelect={this.handleRegionSelect}
            selectedGrape={this.props.selectedGrape}
            selectedRegion={this.props.selectedRegion}
          />
        </div>
        <div className="list-and-details">
          <WineryList
            wineries={this.filterWineriesByName()}
            handleClick={this.handleClick}
          />
          <WineryDetailsContainer
            displayedWinery={this.props.displayedWinery}
            winery={this.props.winery}
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

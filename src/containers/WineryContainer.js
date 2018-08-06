import React, { Component } from 'react';
import { connect } from 'react-redux';

//ADAPTERS
import AdapterWine from './../adapters/AdapterWine'

//COMPONENTS
import WineryList from '../components/WineryList.js';
import WineryDetailsContainer from './WineryDetailsContainer';
import FilterContainer from './FilterContainer';

// ACTIONS
import { storeWineryDetails, storeSelectedWinery, requestWineries, receiveWineries, getWineries } from '../actions';

class WineryContainer extends Component {

  componentDidMount() {
    this.props.getWineries(this.props.selectedRegion, this.props.selectedGrape)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedRegion !== prevProps.selectedRegion || this.props.selectedGrape !== prevProps.selectedGrape ) {
      this.props.getWineries(this.props.selectedRegion, this.props.selectedGrape)      
    }
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
    console.log("render wineryContainer props", this.props)
    return (
      <div className="container">
        <div className="filter">
          <FilterContainer
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

// redux props
const mapStateToProps = state => {
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
    storeWineryDetails: (wineryDetails) => dispatch(storeWineryDetails(wineryDetails)),
    storeSelectedWinery: (selectedWinery) => dispatch(storeSelectedWinery(selectedWinery)),
    requestWineries: () => dispatch(requestWineries()),
    receiveWineries: (wineries) => dispatch(receiveWineries(wineries)),
    getWineries: (region, grape) => dispatch(getWineries(region, grape)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WineryContainer);

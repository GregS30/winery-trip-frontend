import React, { Component } from 'react';
import AdapterAPI from './../adapters/AdapterAPI'

//COMPONENTS
import WineryList from '../components/WineryList.js';
import WineryDetailsContainer from './WineryDetailsContainer';
import FilterContainer from './FilterContainer';

class WineryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wineries: [],
      regions: [],
      winerySearchInput: "",
      displayedWinery: null,
    }
  }

  //INITIAL SETUP
  componentDidMount() {
    this.fetchWineries();
    this.fetchRegions();
  }
  //Data
  fetchWineries = () => {
    AdapterAPI.getWineries()
    .then(wineries => this.setState({
      wineries,
    }))
  }

  fetchRegions = () => {
    AdapterAPI.getRegions()
    .then(regions => this.setState({
      regions,
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

  //PROPS FUNCTIONALITY: NavBar handlers
  handleSearchInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  //PROPS FUNCTIONALITY: WineryList handlers
  handleClick = (e, selectedWinery) => {
    AdapterAPI.getWineryData(selectedWinery.name)
    .then(json => this.setState({displayedWinery: json}))
  }  

  render() {
    return (
      <div className="winery-container">
        <div className="filter">
          <FilterContainer
            renderRegions={this.renderRegions}
            winerySearchInput={this.state.winerySearchInput}
            handleSearchInputChange={this.handleSearchInputChange}
          />
        </div>
        <div className="list-and-details">
          <WineryList
            wineries={this.state.wineries}
            handleClick={this.handleClick}
          />
          <WineryDetailsContainer 
            displayedWinery={this.state.displayedWinery}
          />
        </div>
      </div>
    )
  }
}

export default WineryContainer;

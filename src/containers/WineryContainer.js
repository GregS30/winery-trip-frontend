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
      wineries: null,
      filteredWineries: [],

      regions: null,
      winerySearchInput: "",

      displayedWinery: null,
    }
  }

  //INITIAL SETUP
  componentDidMount() {
    this.fetchWineries();
    this.fetchRegions();
    this.fetchGrapes();
  }
  //Data
  fetchWineries = () => {
    AdapterAPI.getWineries()
    .then(wineries => wineries.sort((w1, w2) => {return w1.name.localeCompare(w2.name)}))
    .then(wineries => this.setState({
      wineries,
      filteredWineries: wineries,
    }))
  }

  fetchRegions = () => {
    AdapterAPI.getRegions()
    .then(regions => this.setState({
      regions,
    }))
  }

  fetchGrapes = () => {
    AdapterAPI.getGrapes()
    .then(grapes => this.setState({
      grapes,
    }))
  }
  //AC.Note: This is interesting. I'd move this function to FilterContainer and pass state regions to it instead.
  renderRegions = () => {
    if (this.state.regions) {
    return this.state.regions.map(region => {
      return (
        <option key={region.id}>{region.name}</option>
      )
    })
  } else {
    return null
  }
  }

  renderGrapes = () => {
    if (this.state.grapes) {
    return this.state.grapes.map(grape => {
      return (
        <option key={grape.id}>{grape.name}</option>
      )
    })
  } else {
    return null
  }
  }

  //PROPS FUNCTIONALITY: NavBar handlers
  handleSearchInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.filteredWineries())
  }

  filteredWineries = () => {
    const filteredWineries = this.state.wineries.filter(winery => {
      return winery.name.toLowerCase().includes(this.state.winerySearchInput)
    })
    this.setState({
      filteredWineries,
    })
  }
  //PROPS FUNCTIONALITY: WineryList handlers
  handleClick = (e, selectedWinery) => {
    AdapterAPI.getWineryData(selectedWinery.name)
    .then(json => {
      json["message"] ? null : this.setState({displayedWinery: json})
    })
  }  


  render() {
    return (
      <div className="winery-container">
        <div className="filter">
          <FilterContainer
            renderRegions={this.renderRegions}
            renderGrapes={this.renderGrapes}


            winerySearchInput={this.state.winerySearchInput}
            handleSearchInputChange={this.handleSearchInputChange}
          />
        </div>
        <div className="list-and-details">
          <WineryList
            wineries={this.state.filteredWineries}
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

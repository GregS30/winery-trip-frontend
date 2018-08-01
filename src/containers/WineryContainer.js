import React, { Component } from 'react';

//ADAPTERS
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
      regions: null,

      displayedWinery: null,

      winerySearchInput: "",
      selectedRegion: "Napa Valley",
      selectedGrape: "Merlot",

      winery: null,
    }
  }

  //INITIAL SETUP
  componentDidMount() {
    this.fetchWineries();
    this.fetchRegions();
    this.fetchGrapes();
  }
  //Data for initial setup
  fetchWineries = () => {
    AdapterAPI.getWineries(this.state.selectedRegion,this.state.selectedGrape)
    .then(wineries => wineries.sort((w1, w2) => {return w1.name.localeCompare(w2.name)}))
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
    })
  }

  handleGrapeSelect = (event) => {
    this.setState({
      selectedGrape: event.target.value,
    }, () => this.fetchWineries())
  }

  handleRegionSelect = (event) => {
    this.setState({
      selectedRegion: event.target.value,
    }, () => this.fetchWineries())
  }

  //PROPS FUNCTIONALITY: WineryList handlers
  handleClick = (e, selectedWinery) => {
    AdapterAPI.getWineryData(selectedWinery.name)
    .then(json => {
      json["message"]
        ? this.setState(
          {displayedWinery: null,
          winery: selectedWinery,
        })
        : this.setState(
        {displayedWinery: json,
          winery: selectedWinery,
        });
    })
  }

  filterWineries = () => {
    if (this.state.wineries) {
      const filteredWineries = this.state.wineries.filter(winery => {
        return winery.name.toLowerCase().includes(this.state.winerySearchInput.toLowerCase())
      })
      return filteredWineries
    }
    else {
      return null
    }
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
            handleGrapeSelect={this.handleGrapeSelect}
            handleRegionSelect={this.handleRegionSelect}
          />
        </div>
        <div className="list-and-details">
          <WineryList
            wineries={this.filterWineries()}
            handleClick={this.handleClick}
          />
          <WineryDetailsContainer
            saveWinery={this.props.saveWinery}
            displayedWinery={this.state.displayedWinery}
            winery={this.state.winery}
          />

        </div>
      </div>
    )
  }
}

export default WineryContainer;

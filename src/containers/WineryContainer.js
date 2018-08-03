import React, { Component } from 'react';

//ADAPTERS
import AdapterWine from './../adapters/AdapterWine'

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
      grapes: [],

      displayedWinery: null,

      nameSearch: "",
      selectedRegion: "Napa Valley",
      selectedGrape: "Merlot",

      winery: null,
    }
  }

  //INITIAL SETUP
  componentDidMount() {
    this.getWineries();
    this.getRegions();
    this.getGrapes();
  }
  //Data for initial setup
  getWineries = () => {
    AdapterWine.fetchWineries(this.state.selectedRegion, this.state.selectedGrape)
    .then(wineries => wineries.sort((w1, w2) => {return w1.name.localeCompare(w2.name)}))
    .then(wineries => this.setState({
      wineries,
    }, (wineries) => console.log("wineries=", this.state.wineries)))
  }

  getRegions = () => {
    AdapterWine.fetchRegions()
    .then(wineries => wineries.sort((w1, w2) => {return w1.name.localeCompare(w2.name)}))
    .then(regions => this.setState({
      regions,
    }))
  }

  getGrapes = () => {
    AdapterWine.fetchGrapes()
    .then(wineries => wineries.sort((w1, w2) => {return w1.name.localeCompare(w2.name)}))
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
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleGrapeSelect = (event) => {
    this.setState({
      selectedGrape: event.target.value,
    }, () => this.getWineries())
  }

  handleRegionSelect = (event) => {
    this.setState({
      selectedRegion: event.target.value,
    }, () => this.getWineries())
  }

  //PROPS FUNCTIONALITY: WineryList handlers
  handleClick = (e, selectedWinery) => {
    AdapterWine.fetchWineryDetails(selectedWinery.name)
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

  filterWineriesByName = () => {
    if (this.state.wineries) {
      const filteredWineries = this.state.wineries.filter(winery => {
        return winery.name.toLowerCase().includes(this.state.nameSearch.toLowerCase())
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

export default WineryContainer;

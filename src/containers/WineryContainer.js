import React, { Component } from 'react';
import WineryList from '../components/WineryList.js';
import WineryDetailsContainer from './WineryDetailsContainer';
import FilterContainer from './FilterContainer';

class WineryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wineries: [],
      filteredWineries: [],
      regions: [],
      winerySearchInput: "",
    }
  }

  componentDidMount() {
    this.fetchWineries();
    this.fetchRegions();
  }

  fetchWineries = () => {
    fetch(`http://localhost:3000/api/v1/wineries`)
    .then(res => res.json())
    .then(wineries => wineries.sort((w1, w2) => {return w1.name.localeCompare(w2.name)}))
    .then(wineries => this.setState({
      wineries,
      filteredWineries: wineries,
    }))
  }

  fetchRegions = () => {
    fetch(`http://localhost:3000/api/v1/regions`)
    .then(res => res.json())
    .then(regions => this.setState({
      regions,
    }))
  }

  renderRegions = () => {
    return this.state.regions.map(region => {
      return (
        <option key={region.id}>{region.name}</option>
      )
    })
  }

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

  render() {
    console.log(this.state)
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
          <WineryList wineries={this.state.filteredWineries}/>
          <WineryDetailsContainer />
        </div>
      </div>
    )
  }
}

export default WineryContainer;

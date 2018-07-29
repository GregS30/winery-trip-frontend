import React, { Component } from 'react';

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
    }
  }

  componentDidMount() {
    this.fetchWineries();
    this.fetchRegions();
  }

  fetchWineries = () => {
    fetch(`http://localhost:3000/api/v1/wineries`)
    .then(res => res.json())
    .then(wineries => this.setState({
      wineries,
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
    })
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
          <WineryList wineries={this.state.wineries}/>
          <WineryDetailsContainer />
        </div>
      </div>
    )
  }
}

export default WineryContainer;

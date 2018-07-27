import React, { Component } from 'react';
import WineryList from '../components/WineryList.js';
import WineryDetailsContainer from './WineryDetailsContainer';
import FilterContainer from './FilterContainer';

class WineryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wineries: [],
      regions: [],
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
    }, () => console.log(this.state)))
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
        <option>{region.name}</option>
      )
    })
  }

  render() {
    return (
      <div className="winery-container">
        <div className="filter">
          <FilterContainer renderRegions={this.renderRegions}/>
        </div>
        <div className="list-and-details">
          <WineryList />
          <WineryDetailsContainer />
        </div>
      </div>
    )
  }
}

export default WineryContainer;

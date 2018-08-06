import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENTS
import WineryList from '../components/WineryList.js';
import WineryDetailsContainer from './WineryDetailsContainer';
import FilterContainer from './FilterContainer';

// ACTIONS
import { getWineries } from '../actions';

class WineryContainer extends Component {

  componentDidMount() {
    this.props.getWineries(this.props.selectedRegion, this.props.selectedGrape)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedRegion !== prevProps.selectedRegion || this.props.selectedGrape !== prevProps.selectedGrape ) {
      this.props.getWineries(this.props.selectedRegion, this.props.selectedGrape)
    }
  }

  filterWineriesByName = () =>
    this.props.wineries.filter(winery =>
      winery.name.toLowerCase()
      .includes(this.props.nameSearch.toLowerCase())
    )

  render() {
//    console.log("render wineryContainer props", this.props)
    return (
      <div className="container">
        <div className="filter">
          <FilterContainer
          />
        </div>
        <div className="list-and-details">
          <WineryList
            wineries={this.filterWineriesByName()}
            handleClick={this.props.handleWineryClick}
          />
          <WineryDetailsContainer
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
    selectedGrape: state.selectedGrape,
    selectedRegion: state.selectedRegion,
    selectedWinery: state.selectedWinery,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getWineries: (region, grape) => dispatch(getWineries(region, grape)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WineryContainer);

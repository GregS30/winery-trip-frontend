import React, { Component } from 'react';

//ADAPTERS
import AdapterAPI from './../adapters/AdapterAPI'

//COMPONENTS
import WineryList from '../components/WineryList.js';
import WineryDetailsContainer from './WineryDetailsContainer';


class TripContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayedWinery: null,
      winery: null,
    }
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

  render() {
    return (
      <div className="container">
        <div className="list-and-details">
          <WineryList
            wineries={this.props.myWineries}
            handleClick={this.handleClick}
          />
          <WineryDetailsContainer
            saveWinery={this.props.saveWinery}
            displayedWinery={this.state.displayedWinery}
            winery={this.state.winery}
          />

        </div>

      </div>
  )}
}

export default TripContainer;

import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENTS
import WineryList from '../components/WineryList.js';
import WineryDetailsContainer from './WineryDetailsContainer';

class TripContainer extends Component {

  render() {
    return (
      <div className="container">
        <h3>Welcome, {this.props.username.charAt(0).toUpperCase() + this.props.username.slice(1)}. Your Wineries.</h3>
        <div className="list-and-details">
          <WineryList
            wineries={this.props.myWineries}
            handleClick={this.props.handleWineryClick}
          />
          <WineryDetailsContainer
            myWineries={this.props.myWineries}
            userId={this.props.userId}
            saveWinery={this.props.saveWinery}
          />
        </div>
      </div>
  )}
}

const mapStateToProps = state => {
  return {
    username: state.username,
    userId: state.userId,
    myWineries: state.myWineries,
  }
}

export default connect(mapStateToProps)(TripContainer);

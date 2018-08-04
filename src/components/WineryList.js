import React, { Component } from 'react';
import { connect } from 'react-redux';

// redux props
const mapStateToProps = state => {
  return {
    wineries: state.wineries,
  }
}

class WineryList extends Component {

  renderWineries = () => {
    return this.props.wineries.map(winery => {
      return (
        <p
          key={winery.id}
          onClick={(e) => this.props.handleClick(e, winery)}
        >{winery.name}</p>
      )
    })
  }

  render() {
    return (
      <div>
        <div>
          <h3 className="winery-header">Wineries</h3>
        </div>
        <div className="winery-list">
        {this.renderWineries()}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(WineryList);

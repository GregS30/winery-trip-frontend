import React, { Component, Fragment } from 'react';

//ADAPTERS
import AdapterWine from './../adapters/AdapterWine'

class WinesList extends Component {
  state = {
    wines: null,
  }

  //Uploads wine list when mounting
  componentDidMount() {
    if (this.props.winery) {
      AdapterWine.fetchWines(this.props.winery)
      .then(json => this.setState({
          wines: json,
      }))
    } else {
      return null
    }
  }

  //Re-uploads wine list when changing winery (props)
  componentDidUpdate(prevProps, prevState) {
    if (this.props.winery !== prevProps.winery) {
      AdapterWine.fetchWines(this.props.winery)
      .then(json => this.setState({
        wines: json,
      }))
    }
    else {
      return null
    }
  }

  //builds wine list. Could be a subcomponent
  buildWinesList = () => {
    return this.state.wines.map(wine => {
      return (
        <tr key={wine.id}>
          <td>{wine.wine_type}</td>
          <td>{wine.name}</td>
          <td>{wine.vintage}</td>
        </tr>
      )
  })
  }

  render() {
    console.log(this.state.wines)
    return (
      <Fragment>
        <br/>
        <h3>Our Cellar</h3>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Wine</th>
              <th>Vintage</th>
            </tr>
          </thead>
          <tbody>
            {this.state.wines ? this.buildWinesList() : null}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default WinesList;

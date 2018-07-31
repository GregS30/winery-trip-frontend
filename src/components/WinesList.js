import React, { Component, Fragment } from 'react';

//ADAPTERS
import AdapterAPI from './../adapters/AdapterAPI'

class WinesList extends Component {
    state = {
        wines: null,
    }

    componentDidUpdate(prevProps, prevState) {
    if (this.props.winery && this.state.wines !== prevState.wines) {
        AdapterAPI.getWines(this.props.winery)
        .then(json => this.setState({
            wines: json,
        }))
    } else {
        null
    }
    }

    buildWinesList = () => {
        return this.state.wines.map(wine => {
            return (
                <tr key={wine.id}>
                    <td>{wine.name}</td>
                    <td>{wine.wine_type}</td>
                </tr>
            )
        })
    }

    render() {
        console.log(this.state.wines)
        return (
            <Fragment>
                <h3>Our Bodega</h3>
                <table>
                    <tr>
                        <th>Wine</th>
                        <th>Type</th> 
                    </tr>
                    {this.state.wines ? this.buildWinesList() : null}
                </table>
            </Fragment>
        );
    }
}

export default WinesList;
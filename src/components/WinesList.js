import React, { Component, Fragment } from 'react';

//ADAPTERS
import AdapterAPI from './../adapters/AdapterAPI'

class WinesList extends Component {
    state = {
        wines: null,
    }

    //Uploads wine list when mounting
    componentDidMount() {
        if (this.props.winery) {
            AdapterAPI.getWines(this.props.winery)
            .then(json => this.setState({
                wines: json,
            }))
        } else {
            null
        }
    }

    //Re-uploads wine list when changing winery (props)
    componentDidUpdate(prevProps, prevState) {
        if (this.props.winery !== prevProps.winery) {
            AdapterAPI.getWines(this.props.winery)
            .then(json => this.setState({
                wines: json,
            }))
        } 
        else {
            null
        }
    }

    //builds wine list. Could be a subcomponent
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
                <h3>Our Cellar</h3>
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
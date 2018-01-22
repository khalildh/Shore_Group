import React, { Component } from 'react';
import data from './data/data';

import StateChart from './StateChart';

class App extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      loading: true,
      data: null
    };
  }

  componentWillMount() {
    if (!this.state.data) {
      this.setState({
        loading: false,
        data: data
      })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
        {
          this.state.loading ? (
            <div className="row">
              <p className="text-center"> Loading Data. </p>
            </div>
          ) : (
            <StateChart data={this.state.data}/>
          )
        }
        </div>
      </div>
    )
  }
}


export default App;

import React, { Component } from 'react';
import Papa from 'papaparse';

import './App.css';


import LoanChart from './LoanChart';
import urlPathToCSV from './data/LoanStats3a.csv';



function csvToJson(url, callback){
  Papa.parse(url, {
    comments: "#",
    download: true,
    complete: function(results) {
      callback(results);
    }
  });
}





class App extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      loading: true,
      data: null,
      width: 800,
      height: 500,
      padding: 50,
      renderChart: false
    };
    this.callback = this.callback.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.renderChart = this.renderChart.bind(this);
  }

  callback(results){
    console.log('callback');
    let newData = []
    results.data.forEach(function(item, idx){
      // console.log(item, idx);
      if (idx !== 0) {
        let newObj = {}
        for (var i = 0; i < item.length; i++) {
          newObj[results.data[0][i]] = item[i];
        }
        newData.push(newObj);
      }
    });
    let newState = Object.assign({}, this.state);
    newState = {...newState,
                loading: false,
                data: newData
              };
    this.setState(newState);

  }

  updateInputValue(evt) {
    this.setState({renderChart: false})
    let newState = Object.assign({}, {});
    newState[evt.target.name] = evt.target.value;
    this.setState(newState);
  }

  renderChart() {
    this.setState({renderChart: true})
  }

  componentWillMount() {
    if (!this.state.data) {
      csvToJson(urlPathToCSV, this.callback);
    }
  }



  render() {
    return (
      <div className="container">
        <div className="row">
          <label htmlFor="width">Width</label>
          <input className="form-control" type="number" name="width" placeholder="width" value={this.state.width} onChange={evt => this.updateInputValue(evt)}/>

          <label htmlFor="height">Height</label>
          <input className="form-control" type="number" name="height" placeholder="height" value={this.state.height} onChange={evt => this.updateInputValue(evt)}/>

          <label htmlFor="padding">Padding</label>
          <input className="form-control" type="number" name="padding" placeholder="padding" value={this.state.padding} onChange={evt => this.updateInputValue(evt)}/>
        {
          this.state.loading ? (
            <div className="row">
              <p className="text-center"> Loading Data. </p>
            </div>
          ) : (
            this.state.renderChart ? (
              <div className="row">
                <LoanChart data={this.state.data} width={this.state.width} height={this.state.height} padding={this.state.padding}/>
              </div>
            ) : (
              <div className="row">
                <button className="btn btn-success" onClick={this.renderChart}> Render the Chart </button>
              </div>
            )
          )

        }
      </div>
    </div>
    )
  }
}

export default App;

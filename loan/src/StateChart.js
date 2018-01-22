import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import propTypes from 'prop-types';
import * as d3 from 'd3';
import './StateChart.css'

class StateChart extends Component {
  constructor(props){
  	super(props);
  	this.state = {};
    this.makeChart = this.makeChart.bind(this);
  }

  makeChart() {
    const width = 800,
          height = 925,
          padding = 50;

    let div = new ReactFauxDOM.Element('div')

    const xScale = d3.scaleLinear()
                    .domain([d3.min(this.props.data.map((d) => d.avg)) - 20 , d3.max(this.props.data.map((d) => d.avg))])
                    .range([0, width - padding])



    let svg = d3.select(div)
          .append("svg")
          .attr("width", width + padding)
          .attr("height", height + padding)

    let rect = svg.selectAll("rect")
                .data(this.props.data)
                .enter()
                .append("rect")
                .attr("width", (d, i) => xScale(d.avg))
                .attr("height", 20)
                .attr("y", (d, i) => padding + i * 23)
                .attr("x", 25)
                .attr("class", "bar")
                .append("title")
                .text((d, i) => `State: ${d.state}\nAverage: $${d.avg}`)

    let text = svg.selectAll("text")
                .data(this.props.data)
                .enter()
                .append("text")
                .attr("y",  (d, i) => 15 + padding + i * 23)
                .attr("x", 0)
                .text((d, i) => d.state)
                .style("font-size", "15px")
                .style("fill", "blue" )

    let xAxis = d3.axisBottom(xScale)

    svg.append("g")
      .attr("transform", `translate(25, ${height})`)
      .call(xAxis)

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", (width  + padding + 200) / 2)
      .attr("y", height + padding - 10)
      .text("Average Loan Amount")
      .attr("fill", "blue")
      .style("font-size", "24px")


    return div
  }

  render() {
      return (
          <div className="container">
            <div className="row">
              <h1> Average Loan per State </h1>
            </div>
            <div className="row">
              <h3> Sampling of 50 random loans per state with at least 100 Loans</h3>
            </div>
            <div className="row">
              {
                this.makeChart().toReact()
              }
            </div>
          </div>
      );
  }
}

StateChart.propTypes = {
  data: propTypes.array.isRequired
}

export default StateChart;

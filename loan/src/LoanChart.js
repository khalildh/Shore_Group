import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from "d3";

import propTypes from 'prop-types';
import './LoanChart.css';


class LoanChart extends Component {
  constructor(props){
  	super(props);
  	this.state = {};
  }

  render(){
    var sort_by = function(field, reverse, primer){

     var key = primer ?
         function(x) {return primer(x[field])} :
         function(x) {return x[field]};

     reverse = !reverse ? 1 : -1;

     return function (a, b) {
         return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     }
    }

    let data = this.props.data;
    data = data.sort(sort_by('loan_amnt', true, parseInt));

    const width = Number(this.props.width),
          height = Number(this.props.height),
          padding = Number(this.props.padding)

    const xScale = d3.scaleLinear()
                    .domain([d3.min(data.map((d) => Number(d.loan_amnt))), d3.max(data.map((d) => Number(d.loan_amnt)))])
                    .range([padding, width - padding])

    const yScale = d3.scaleLinear()
                    .domain([0, d3.max(data.map((d) => Number(d.total_pymnt)))])
                    .range([0, height])



    const div = new ReactFauxDOM.Element('div');

    let svg = d3.select(div)
        .append("svg")
        .attr("width", Number(width) + Number(padding))
        .attr("height", Number(height) + Number(padding))

        svg.selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", (d, i) => xScale(Number(d.loan_amnt)))
          .attr("y", (d, i) => height - yScale(Number(d.total_pymnt)))
          .attr("width", 1)
          .attr("height", (d, i) => yScale(Number(d.total_pymnt)))
          .attr("fill", (d) => (
            Number(d.total_pymnt) >= Number(d.loan_amnt) ? "black" : "red"
          ))
          .append("title")
          .text((d) => (`Employee Title: ${d.emp_title},\n Loan Amount: ${d.loan_amnt},\n Total Payment: ${d.total_pymnt}`))

        // svg.selectAll("text")
        //   .data(data)
        //   .enter()
        //   .append("text")
        //   .attr("x", (d, i) => i)
        //   .attr("y", (d, i) => {return height - Number(d.loan_amnt) * 2- 10})
        //   .text((d) => (`Loan Amount: ${d.loan_amnt}`))
        //   .style("font-size", "25px")
        //   .style("fill", "red")


    const xAxisScale = d3.scaleLinear()
                    .domain([0, d3.max(data.map((d) => Number(d.loan_amnt)))])
                    .range([0, width])

    const xAxis = d3.axisBottom(xScale)

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)

    svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width / 2)
      .attr("y", height + padding / 2)
      .text("Loan Amount")
      .attr("fill", "blue")
      .style("font-size", "16px")


    const yAxisScale = d3.scaleLinear()
                    .domain([0, d3.max(data.map((d) => Number(d.total_pymnt)))])
                    .range([height, 0])

    const yAxis = d3.axisLeft(yAxisScale);

    svg.append("g")
      .attr("transform", `translate(${padding}, 0)`)
      .call(yAxis)

    // svg.append("text")
    // .attr("class", "y label")
    // .attr("transform", "rotate(-90)")
    // .attr("y", 0 - padding)
    // .attr("x", (height / 2))
    // .attr("dy", "1em")
    // .attr("text-anchor", "middle")
    // .text("Total Payment");

    svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("x", padding - height / 2)
      .attr("y", padding / 2)
      .text("Total Payment")
      .attr("fill", "blue")
      .attr("transform", "rotate(-90)")


    return(
      <div>
      <h1 className="text-center">
      Total Payment vs Loan Amount Chart
      </h1>
      {div.toReact()}
      </div>
    )
  }
}

LoanChart.propTypes = {
  data: propTypes.array.isRequired,
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
  padding: propTypes.number.isRequired
}

export default LoanChart;

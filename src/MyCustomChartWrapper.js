import d3 from "d3";
import React from "react";
import { render } from "react-dom";
import d3act from "d3act";

import Chart from 'd3act';

import ASpecificChart from './ASpecificChart';

//this is merely a wrapper for d3act
//in this first raw implementation, we have our data here as well as our render function
export default class MyCustomChartWrapper extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                "React": 2,
                "Relay": 12,
                "GraphQL": 5,
                "Radium": 7,
                "Babel": 5,
            }
        };
    }

    render() {
        return (
            <div>
                <h2>This is a Custom Chart</h2>
                <Chart
                    type={"custom"}
                    customChart={ASpecificChart}
                    showTooltips={true}
                    data={this.state.data}
                />
            </div>
        );
    }

}

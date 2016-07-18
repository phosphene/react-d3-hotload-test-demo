import d3 from "d3";
import React from "react";
import { render } from "react-dom";
import d3act from "d3act";

import Chart from 'd3act';

import ASpecificChart from './ASpecificChart';



export default class MyCustomChart extends React.Component {

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
                <h2>Custom Chart</h2>
                <Chart
                    type={"custom"}
                    customChart={ASpecificChart}
                    data={this.state.data}
                />
            </div>
        );
    }

}

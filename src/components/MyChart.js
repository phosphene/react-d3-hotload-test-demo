import d3 from "d3";
import React from "react";
import { render } from "react-dom";


import Chart from "./Chart";

export default class MyChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
                { xValue: "React", yValue: 3 },
                { xValue: "Relay", yValue: 13 },
                { xValue: "GraphQL", yValue: 5 },
                { xValue: "Radium", yValue: 7 },
                { xValue: "Babel", yValue: 5 },
            ]
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: [
                    { xValue: "React", yValue: 4 },
                    { xValue: "Relay", yValue: 24 },
                    { xValue: "GraphQL", yValue: 10 },
                    { xValue: "Radium", yValue: 27 },
                    { xValue: "Babel", yValue: 5 },
                ]
            })
        }, 3000);
    }


    componentDidUpdate() {
        setTimeout(() => {
            this.setState({
                data: [
                    { xValue: "React", yValue: 16 },
                    { xValue: "Relay", yValue: 24 },
                    { xValue: "GraphQL", yValue: 10 },
                    { xValue: "Radium", yValue: 25 },
                    { xValue: "Babel", yValue: 5 },
                ]
            })
        }, 1000);
    }






    render() {
        return (
            <div>
                <h2>A Bar Chart</h2>
                <Chart
                    type={"bar"}
                    width={600}
                    height={500}
                    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                    showTooltips={true}
                    data={this.state.data}
                />
            </div>
        );
    }
}

import HeatMapFilteringDC from '../charts/HeatMapFilteringDC';
import React, {PropTypes}              from 'react';
import ReactDOM           from 'react-dom';


class HeatMapFilteringWrapper extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
                <div>
                <h2>Michelson–Morley experiment</h2>
                <div id="heatmap"></div>
                <div id="barchart"></div>
                </div>
        );

    }


    componentDidMount() {
       this.chart = new HeatMapFilteringDC();
       this.chart.render();

    }

    componentDidUpdate() {
     //   this.chart.update();
    }


    componentWillUnmount() {
        this.chart.destroy();
    }

}

export default HeatMapFilteringWrapper;

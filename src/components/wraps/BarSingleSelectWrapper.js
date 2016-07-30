import BarSingleSelectDC from '../charts/BarSingleSelectDC';
import React, {PropTypes}              from 'react';
import ReactDOM           from 'react-dom';


class BarSingleSelectWrapper extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        //note the arrow function
        //this is sugar that allows us to simplify
        //see the readme
        //we use this pattern for resets of the charts
        const clickReset = () => {
            this.chart.update();

        }

        return (
                <div id="chart">
                <div>
                <a onClick={clickReset}> reset</a>
                </div>
                </div>
        );

    }


    componentDidMount() {
       this.chart = new BarSingleSelectDC();
       this.chart.render();

    }

    componentDidUpdate() {
        this.chart.update();
    }


    componentWillUnmount() {
        this.chart.destroy();
    }

}
//always export!
export default BarSingleSelectWrapper;

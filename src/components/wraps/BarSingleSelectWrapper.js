import BarSingleSelectDC from '../charts/BarSingleSelectDC';
import React, {PropTypes}              from 'react';
import ReactDOM           from 'react-dom';


class BarSingleSelectWrapper extends React.Component {

    constructor(props) {
        super(props);
       // console.log({props});

    }

    render() {
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
       this.chart = new BarSingleSelectDC(this.getDOMNode());
       this.chart.render();

    }

    componentDidUpdate() {
        this.chart.update(this.getDOMNode());
    }


    componentWillUnmount() {
        this.chart.destroy(this.getDOMNode());
    }


    getDOMNode() {
        return ReactDOM.findDOMNode(this);
    }

}

export default BarSingleSelectWrapper;

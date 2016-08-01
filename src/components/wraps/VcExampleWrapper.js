import VcDashboardDC from '../charts/VcDashboardDC';
import React, {PropTypes}              from 'react';
import ReactDOM           from 'react-dom';


class VcExampleWrapper extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <div id="us-chart">
                <strong>VC Distribution by States (color: total amount raised)</strong>
                <a className="reset" href="" >reset</a>
                <span className="reset" > | Current filter: <span className="filter"></span></span>

                <div className="clearfix"></div>
                </div>

                <div className="clearfix"></div>

                <div id="industry-chart">
                <strong>By Industries</strong> (y: number of deals, x: total amount raised in millions, radius: amount raised)
                <a className="reset" href="">reset</a>

                <div className="clearfix"></div>
                </div>

                <div className="clearfix"></div>

                <div id="round-chart">
                <strong>By Rounds</strong> (y: number of deals, x: total amount raised in millions, radius: amount raised)
                <a className="reset" href="">reset</a>

                <div className="clearfix"></div>
                </div>

                <div className="clearfix"></div>

                <div>
                <a href="">Reset All</a>
                </div>
            </div>
        );

    }


    componentDidMount() {
     this.dashboard = new VcDashboardDC();
     this.dashboard.render();

    }

    componentDidUpdate() {
     //   this.chart.update();
    }


    componentWillUnmount() {
       // this.dashboard.destroy();
    }

}

export default VcExampleWrapper;

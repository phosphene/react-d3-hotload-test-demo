import ThrashDashDC from '../charts/ThrashDashDC';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';


class ThrashWrapper extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        const pStyle = { marginRight: "15px"};
        const cursorStyle = { display: 'none', cursor: 'pointer'};

        const clickReset = (x) => {
          console.log(x);
        }

        return (

            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-2">
                    <div id="chart-ring-year">
                        <strong>Year</strong>
                        <a className="reset" onClick={()=>clickReset("chart-ring-year")} style={cursorStyle}> reset</a>
                        <div className="clearfix"></div>
                    </div>
                </div>
                {/*<div className="col-xs-2 pie-chart">
                  <h4>Year <small><a id="year">reset</a></small></h4>
                  <div className="dc-chart" id="chart-ring-years"></div>
                </div>*/}
                <div className="col-xs-2 pie-chart">
                  <h4>Month <small><a id="month" href="#">reset</a></small></h4>
                  <div className="dc-chart" id="chart-ring-month"></div>
                </div>
                <div className="col-xs-2 pie-chart">
                  <h4>Day <small><a id="day">reset</a></small></h4>
                  <div id="chart-ring-day" className="dc-chart"></div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-6 col-md-3">
                  <div className="dc-chart" id="chart-bar-fun-factor"></div>
                </div>
                <div className="col-xs-6 col-md-3">
                  <div className="dc-chart" id="chart-bar-crowd-factor"></div>
                </div>
                <div className="col-xs-6 col-md-3">
                  <div className="dc-chart" id="chart-bar-hollow-factor"></div>
                </div>
                <div className="col-xs-6 col-md-3">
                  <div className="dc-chart" id="chart-bar-quality-factor"></div>
                </div>
              </div>
            </div>
        );

    }


    componentDidMount() {
        this.dashboard = new ThrashDashDC();
        this.dashboard.render();

    }

    componentDidUpdate() {
        //   this.chart.update();
    }


    componentWillUnmount() {
        // this.dashboard.destroy();
    }

}

export default ThrashWrapper;

import VcDashboardDC from '../charts/VcDashboardDC';
import React, {PropTypes}              from 'react';
import ReactDOM           from 'react-dom';


class VcExampleWrapper extends React.Component {

    constructor(props) {
        super(props);

    }



 /**

We must convert regular html to jsx
here is what the regular html was

       <div id="us-chart">
       <strong>VC Distribution by States (color: total amount raised)</strong>
       <a class="reset" href="javascript:usChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
       <span class="reset" style="display: none;"> | Current filter: <span class="filter"></span></span>
       <div class="clearfix"></div>
       </div>
**/

//and below in the render is the jsx

//note the special case of the onclick for the resets
// the html was like this        <a class="reset" href="javascript:usChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
// note also that style is absent from the jsx, we can fix that as well
// the reset minus the style looks like this
//              <a className="reset" onClick={clickUSReset} href="#" >reset</a>
// note the curly braces and the constant clickUSReset which is a function and the function
//is defined in the dashboard class which calls usChart.filterall() and redrawall()
//here are the other resets
// <a class="reset" href="javascript:industryChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
//        <a class="reset" href="javascript:roundChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
//        <a href="javascript:dc.filterAll(); dc.renderAll();">Reset All</a>
    render() {

        const clickUSReset = () => {
            this.dashboard.resetUSChart();
        }

        const clickIndustryReset = () => {
            this.dashboard.resetIndustryChart();
        }


        const clickRoundReset = () => {
            this.dashboard.resetRoundChart();
        }

        const clickAllReset = () => {
            this.dashboard.resetALL();
        }


        return (
            <div>
                <div id="us-chart">
                <strong>VC Distribution by States (color: total amount raised)</strong>
                <a className="reset" onClick={clickUSReset} href="#us-chart" >reset</a>
                <span className="reset" > | Current filter: <span className="filter"></span></span>

                <div className="clearfix"></div>
                </div>

                <div className="clearfix"></div>

                <div id="industry-chart">
                <strong>By Industries</strong> (y: number of deals, x: total amount raised in millions, radius: amount raised)
                <a className="reset" onClick={clickIndustryReset} href="#industry-chart">reset</a>

                <div className="clearfix"></div>
                </div>

                <div className="clearfix"></div>

                <div id="round-chart">
                <strong>By Rounds</strong> (y: number of deals, x: total amount raised in millions, radius: amount raised)
                <a className="reset" onClick={clickRoundReset} href="#round-chart">reset</a>

                <div className="clearfix"></div>
                </div>

                <div className="clearfix"></div>

                <div>
                <a onClick={clickAllReset} href="#">Reset All</a>
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

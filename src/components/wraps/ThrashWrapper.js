import ThrashDashDC from '../charts/ThrashDashDC';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';


class ThrashWrapper extends React.Component {

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

        //style="display: none;"
        // lets try a style tag the react way ;-)
        //based on this example
        /**

            var divStyle = {
            color: 'white',
            backgroundImage: 'url(' + imgUrl + ')',
            WebkitTransition: 'all', // note the capital 'W' here
            msTransition: 'all' // 'ms' is the only lowercase vendor prefix
            };
        **/
        const aStyle = { display: 'none'};

        return (

                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xs-12 dc-data-count dc-chart" id="data-count">
                      <h2>Surf Session History
                        <small>

                           <a id="all" href="#">Reset All</a>

                        </small>
                      </h2>
                    </div>
                  </div>
                  <div className="row" id="control-row">
                    <div className="col-xs-2 pie-chart">
                      <h4>Year <small><a id="year">reset</a></small></h4>
                      <div className="dc-chart" id="chart-ring-year"></div>
                    </div>
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
                      <div className="dc-chart" id="chart-rating-count"></div>
                    </div>
                    <div className="col-xs-6 col-md-3">
                      <div className="dc-chart" id="chart-community-rating-count"></div>
                    </div>
                    <div className="col-xs-6 col-md-3">
                      <div className="dc-chart" id="chart-abv-count"></div>
                    </div>
                    <div className="col-xs-6 col-md-3">
                      <div className="dc-chart" id="chart-ibu-count"></div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <table className="table table-bordered table-striped" id="data-table">
                        <thead>
                          <tr className="header">
                            <th>Brewery</th>
                            <th>Beer</th>
                            <th>Style</th>
                            <th>My Rating</th>
                            <th>Community Rating</th>
                            <th>ABV %</th>
                            <th>IBU</th>
                          </tr>
                        </thead>
                      </table>
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

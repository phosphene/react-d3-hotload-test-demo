import BeerDashDC from '../charts/BeerDashDC';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';


class BeerExampleWrapper extends React.Component {

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
                <div>
                <div>
                <strong>No Bootstrap</strong>
                </div>
                </div>

                /*<div class="container">
                <div>
                <strong>Bootstrap</strong>
                </div>
                </div>*/
        );

    }


    componentDidMount() {
        this.dashboard = new BeerDashDC();
        this.dashboard.render();

    }

    componentDidUpdate() {
        //   this.chart.update();
    }


    componentWillUnmount() {
        // this.dashboard.destroy();
    }

}

export default BeerExampleWrapper;

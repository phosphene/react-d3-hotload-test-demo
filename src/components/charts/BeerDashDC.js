import * as d3 from 'd3';
import {crossfilter, units, geoChoroplethChart, bubbleChart, renderAll, redrawAll, filterAll} from 'dc';

//we can call export at the top of the class declaration
export default class BeerDashDC {

    constructor(el, props = {}) {
        console.log(props)
        //we initiate charts in constructor

        this.numberFormat = d3.format(".2f");

    }


    //and we call render here. this is not a react render. we could call it something else
    render() {

        }

}

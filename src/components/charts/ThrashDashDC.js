import * as d3 from 'd3';
import {crossfilter, units, geoChoroplethChart, bubbleChart, renderAll, redrawAll, filterAll, pieChart, barChart, dataCount, dataTable, pluck} from 'dc';

//we can call export at the top of the class declaration
export default class BeerDashDC {

    constructor(el, props = {}) {
        //we initiate charts in constructor

        console.log('in construcor');
        this.numberFormat = d3.format(".2f");

    }

    render() {
        console.log('in render');
        d3.json('src/stores/thrashtown.json', function (error, data) {
            var surfData = data;

            //var date = d3.time.format("%Y-%m-%d").parse("2016-11-28");
            //var date = d3.time.format("%Y-%m-%d").parse("2016-11-28T00:51:00.000z");
            var date = new Date("2016-01-28T00:51:00.000z");
            //console.log(date.getUTCMonth());
            //console.log(date.getUTCFullYear());
            //var fullDateFormat = d3.time.format('%a, %d %b %Y %X %Z');
            //var fullDateFormat = d3.time.format('%a, %d %b %Y %X %Z');
            //var yearFormat = d3.time.format('%Y');
            //var monthFormat = d3.time.format('%b');
            //var dayOfWeekFormat = d3.time.format('%a');


            //console.log(surfData);
            surfData.forEach(d=>{
                /*d.sessionDateDt = new Date(d.sessionDate);
                d.sessionYearDt = d.sessionDateDt.getUTCFullYear();
                d.sessionMonthDt = d.sessionDateDt.getUTCMonth();
                console.log(d.sessionDateDt);
                console.log(d.sessionYearDt);
                console.log(typeof(d.sessionMonthDt));*/

                const fullDateFormat = d3.time.format("%a, %d %b %Y %X %Z");
                const yearFormat = d3.time.format('%Y');
                const monthFormat = d3.time.format('%b');
                const dayOfWeekFormat = d3.time.format('%a');

                d.sessionDateFormatted = fullDateFormat(new Date(d.sessionDate));
                d.sessionYear = yearFormat(new Date(d.sessionDate));
                //d.sessionYear = yearFormat(d.sessionDateFormatted);
                console.log(d.sessionDateFormatted);
                console.log(d.sessionYear);

            });

            var ttx = crossfilter(surfData);
            //console.log(ttx);
        });
    }
}



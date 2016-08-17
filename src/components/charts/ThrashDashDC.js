import * as d3 from 'd3';
import {crossfilter, units, geoChoroplethChart, bubbleChart, renderAll, redrawAll, filterAll, pieChart, barChart, dataCount, dataTable, pluck} from 'dc';

//we can call export at the top of the class declaration
export default class ThrashDashDC {

    constructor(el, props = {}) {
        //we initiate charts in constructor

        console.log('in construcor');
        this.numberFormat = d3.format(".2f");

    }

    render() {
        console.log('in render');
        d3.json('src/stores/thrashtown.json', function (error, data) {
            var surfData = data;

            const fullDateFormat = d3.time.format("%a, %d %b %Y %X %Z");
            const yearFormat = d3.time.format('%Y');
            const monthFormat = d3.time.format('%b');
            const dayFormat = d3.time.format('%a');

            surfData.forEach(d=>{
              /*d.sessionDateDt = new Date(d.sessionDate);
                 d.sessionYearDt = d.sessionDateDt.getUTCFullYear();
                 d.sessionMonthDt = d.sessionDateDt.getUTCMonth();
                 console.log(typeof(d.sessionMonthDt));*/

                let dateObj  = new Date(d.sessionDate);
                d.sessionDateFormatted = fullDateFormat(dateObj);
                d.sessionYear = +yearFormat(dateObj);
                d.sessionMonth = monthFormat(dateObj);
                console.log(typeof(d.sessionMonth));
                d.sessionDay = dayFormat(dateObj);

            });

            const ttx = crossfilter(surfData);

            // create dimensions (x-axis values)
            //var yearDim  = ttx.dimension(function(d) {return d.sessionYear;}),
            var yearDim  = ttx.dimension(pluck("sessionYear"));
            var monthDim  = ttx.dimension(pluck("sessionMonth"));
            //console.log(yearDim.top(2));

            // create groups (y-axis values)
            var all = ttx.groupAll();
            var countPerYear = yearDim.group().reduceCount();
            var countPerMonth = monthDim.group().reduceCount();

            const yearChart = pieChart('#chart-ring-year');
            const monthChart = pieChart('#chart-ring-month');
                //dayChart = pieChart('#chart-ring-day');

            yearChart
              .width(150)
              .height(150)
              .dimension(yearDim)
              .group(countPerYear)
              .innerRadius(20);

            monthChart
              .width(150)
              .height(150)
              .dimension(monthDim)
              .group(countPerMonth)
              .innerRadius(20)
              .ordering(function (d) {
                var order = {
                  'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4,
                  'may': 5, 'jun': 6, 'jul': 7, 'aug': 8,
                  'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12
                };
                return order[d.key];
              });

            /*daychart
              .width(150)
              .height(150)
              .dimension(dayofweekdim)
              .group(countperday)
              .innerradius(20)
              .ordering(function (d) {
                var order = {
                  'mon': 0, 'tue': 1, 'wed': 2, 'thu': 3,
                  'fri': 4, 'sat': 5, 'sun': 6
                }
                return order[d.key];
              }
             );*/

            //draw the viz!
            renderAll();

        });
    }
}

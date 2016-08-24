import * as d3 from 'd3';
import {crossfilter, units, geoChoroplethChart, bubbleChart, renderAll, redrawAll, filterAll, pieChart, barChart, dataCount, dataTable, pluck} from 'dc';

//we can call export at the top of the class declaration
export default class ThrashDashDC {

    constructor(el, props = {}) {
        //we initiate charts in constructor
        this.qualityFactorChart = barChart('#chart-bar-quality-factor');
        this.hollowFactorChart = barChart('#chart-bar-hollow-factor');
        this.crowdFactorChart = barChart('#chart-bar-crowd-factor');
        this.funFactorChart = barChart('#chart-bar-fun-factor');
        this.yearChart = pieChart('#chart-ring-year');
        this.monthChart = pieChart('#chart-ring-month');
        this.dayChart = pieChart('#chart-ring-day');



        console.log('the construcor');

    }

    render() {
        //console.log('in render');
        const qualityFactorChart = this.qualityFactorChart
        const hollowFactorChart = this.hollowFactorChart;
        const crowdFactorChart = this.crowdFactorChart;
        const funFactorChart = this.funFactorChart;
        const yearChart = this.yearChart;
        const monthChart = this.monthChart;
        const dayChart = this.dayChart;

        d3.json('src/stores/thrashtown.json', function (error, data) {
            var surfData = data;

            const fullDateFormat = d3.time.format("%a, %d %b %Y %X %Z");
            const yearFormat = d3.time.format('%Y');
            const monthFormat = d3.time.format('%b');
            const dayFormat = d3.time.format('%a');

            surfData.forEach(d=>{
                let dateObj  = new Date(d.sessionDate);
                d.sessionDateFormatted = fullDateFormat(dateObj);
                d.sessionYear = +yearFormat(dateObj);
                d.sessionMonth = monthFormat(dateObj);
                console.log(typeof(d.waveQuality));
                d.sessionDay = dayFormat(dateObj);

            });

            const ttx = crossfilter(surfData);

            // create dimensions (x-axis values)
            var qualityFactorDim  = ttx.dimension(pluck("waveQuality"));
            var hollowFactorDim  = ttx.dimension(pluck("hollowness"));
            var crowdFactorDim  = ttx.dimension(pluck("crowdedness"));
            var funFactorDim  = ttx.dimension(pluck("funFactor"));
            var yearDim  = ttx.dimension(pluck("sessionYear"));
            var monthDim  = ttx.dimension(pluck("sessionMonth"));
            var dayDim  = ttx.dimension(pluck("sessionDay"));

            // create groups (y-axis values)
            var all = ttx.groupAll();
            var countPerQualityFactor = qualityFactorDim.group().reduceCount();
            var countPerHollowFactor = hollowFactorDim.group().reduceCount();
            var countPerCrowdFactor = crowdFactorDim.group().reduceCount();
            var countPerFunFactor = funFactorDim.group().reduceCount();
            var countPerYear = yearDim.group().reduceCount();
            var countPerMonth = monthDim.group().reduceCount();
            var countPerDay = dayDim.group().reduceCount();

            qualityFactorChart
                .width(300)
                .height(180)
                .dimension(qualityFactorDim)
                .group(countPerQualityFactor)
                .x(d3.scale.linear().domain([0,5.2]))
                .elasticY(true)
                .centerBar(true)
                .barPadding(5)
                .xAxisLabel('Quality Factor')
                .yAxisLabel('Sessions')
            qualityFactorChart.xAxis().tickValues([0,1,2,3,4,5]);

            hollowFactorChart
                .width(300)
                .height(180)
                .dimension(hollowFactorDim)
                .group(countPerHollowFactor)
                .x(d3.scale.linear().domain([0,5.2]))
                .elasticY(true)
                .centerBar(true)
                .barPadding(5)
                .xAxisLabel('Hollow Factor')
                .yAxisLabel('Sessions')
            hollowFactorChart.xAxis().tickValues([0,1,2,3,4,5]);

            crowdFactorChart
                .width(300)
                .height(180)
                .dimension(crowdFactorDim)
                .group(countPerCrowdFactor)
                .x(d3.scale.linear().domain([0,5.2]))
                .elasticY(true)
                .centerBar(true)
                .barPadding(5)
                .xAxisLabel('Crowd Factor')
                .yAxisLabel('Sessions')
            crowdFactorChart.xAxis().tickValues([0,1,2,3,4,5]);

            funFactorChart
                .width(300)
                .height(180)
                .dimension(funFactorDim)
                .group(countPerFunFactor)
                .x(d3.scale.linear().domain([0,5.2]))
                .elasticY(true)
                .centerBar(true)
                .barPadding(5)
                .xAxisLabel('Fun Factor')
                .yAxisLabel('Sessions')
            funFactorChart.xAxis().tickValues([0, 1, 2, 3, 4, 5]);

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

            dayChart
                .width(150)
                .height(150)
                .dimension(dayDim)
                .group(countPerDay)
                .innerRadius(20)
                .ordering(function (d) {
                var order = {
                  'mon': 0, 'tue': 1, 'wed': 2, 'thu': 3,
                  'fri': 4, 'sat': 5, 'sun': 6
                }
                return order[d.key];
                });

            //draw the viz!
            renderAll();

        });
    }
    resetChart(chartName) {

    switch (chartName) {
        case "chart-ring-year":
            this.yearChart.filterAll();
            break;
        case "chart-ring-month":
            this.monthChart.filterAll();
            break;
        case "chart-ring-day":
            this.dayChart.filterAll();
            break;
        case "chart-bar-fun-factor":
            this.funFactorChart.filterAll();
            break;
        case "chart-bar-crowd-factor":
            this.crowdFactorChart.filterAll();
            break;
        case "chart-bar-hollow-factor":
            this.hollowFactorChart.filterAll();
            break;
        case "chart-bar-quality-factor":
            this.qualityFactorChart.filterAll();
            break;
        default:
            //Statements executed when none of the values match the value of the expression
            break;
    }

    redrawAll();
    }
}

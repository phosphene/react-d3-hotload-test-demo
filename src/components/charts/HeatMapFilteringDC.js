import * as d3 from 'd3';
import {heatMap, barChart, crossfilter, units} from 'dc';
//import {heatMap, barChart, crossfilter, units} from 'dc';


export default class HeatMapFilteringDC {

    constructor(el, props = {}) {
        console.log(props)
        const chartGroup = "chartGroup";
        this.barChart = barChart("#barchart", chartGroup);
        this.heatmapChart = heatMap("#heatmap", chartGroup);
    }


render() {


    const barChart = this.barChart
    const heatmapChart = this.heatmapChart;

d3.csv("./src/stores/ndx.csv", function(error, data) {
        var dateFormat = d3.time.format("%m/%d/%Y");
        data.forEach(function (d) {
            d.dd = dateFormat.parse(d.date);
            d.month = d3.time.month(d.dd).getMonth(); // pre-calculate month for better performance
            d.year = d3.time.year(d.dd).getFullYear();
            d.close = +d.close; // coerce to number
            d.open = +d.open;
        });
        var ndx = crossfilter(data),
            monthOfTheYearDimension = ndx.dimension(function(d) { return [+d.month, +d.year]; }),
            percentageGainByMonthOfYearGroup = monthOfTheYearDimension.group().reduce(
                /* callback for when data is added to the current filter results */
                function (p, v) {
                    ++p.count;
                    p.absGain += v.close - v.open;
                    p.fluctuation += Math.abs(v.close - v.open);
                    p.sumIndex += (v.open + v.close) / 2;
                    p.avgIndex = p.count ? p.sumIndex / p.count : 0;
                    p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0;
                    p.fluctuationPercentage = p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0;
                    return p;
                },
                /* callback for when data is removed from the current filter results */
                function (p, v) {
                    --p.count;
                    p.absGain -= v.close - v.open;
                    p.fluctuation -= Math.abs(v.close - v.open);
                    p.sumIndex -= (v.open + v.close) / 2;
                    p.avgIndex = p.count ? p.sumIndex / p.count : 0;
                    p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0;
                    p.fluctuationPercentage = p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0;
                    return p;
                },
                /* initialize p */
                function () {
                    return {count: 0, absGain: 0, fluctuation: 0, fluctuationPercentage: 0, sumIndex: 0, avgIndex: 0, percentageGain: 0};
                }
            );
        var heatColorMapping = function(d) {
            if (d < 0) {
                return d3.scale.linear().domain([-23,0]).range(["red", "#e5e5e5"])(d);
            }
            else {
                return d3.scale.linear().domain([0,23]).range(["#e5e5e5", "green"])(d);
            }
        };
        heatColorMapping.domain = function() {
            return [-23,23];
        };
        heatmapChart
                .width(12 * 80 + 80)
                .height(27 * 10 + 40)
                .dimension(monthOfTheYearDimension)
                .group(percentageGainByMonthOfYearGroup)
                .keyAccessor(function(d) { return +d.key[0]; })
                .valueAccessor(function(d) { return +d.key[1]; })
                .colorAccessor(function(d) { return +d.value.percentageGain; })
                .title(function(d) {
                    return " Month:   " + d.key[0] + "\n" +
                           "  Year:   " + d.key[1] + "\n" +
                           "  Gain:   " + d.value.percentageGain + "%";})
                .colors(heatColorMapping)
                .calculateColorDomain();
        heatmapChart.xBorderRadius(0);
        heatmapChart.yBorderRadius(0);
        heatmapChart.render();
        var monthlyDimension = ndx.dimension(function (d) { return +d.month; });
        var percentageGainByMonthArrayGroup = monthlyDimension.group().reduce(
            function(p,v) {
                var absGain = v.close - v.open;
                var percentageGain = v.open ? (absGain / v.open) * 100 : 0;
                return p + percentageGain;
            },
            function(p,v) {
                var absGain = v.close - v.open;
                var percentageGain = v.open ? (absGain / v.open) * 100 : 0;
                return p - percentageGain;
            },
            function() {
                return 0;
            }
        );
        barChart
                .dimension(monthlyDimension)
                .group(percentageGainByMonthArrayGroup)
                .width(12 * 80 + 80)
                .height(480)
                .y(d3.scale.linear().domain([-10.0,100.0]))
                .x(d3.scale.linear().domain([-0.5,11.5]))
                .elasticY(true)
                .centerBar(true);
        barChart.render();
    });

}



}

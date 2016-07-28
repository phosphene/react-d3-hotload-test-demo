import * as d3 from 'd3';
//import {crossfilter} from 'crossfilter';
import {barChart, crossfilter, units} from 'dc';


export default class BarSingleSelectDC {

    constructor(el, props = {}) {
        console.log(props)
        //const experiments = props.data;
        const chart = barChart("#test");


        d3.csv("morley.csv", function(error, experiments) {

        var ndx                 = crossfilter(experiments),
        runDimension        = ndx.dimension(function(d) {return +d.Run;}),
        speedSumGroup       = runDimension.group().reduceSum(function(d) {return d.Speed * d.Run / 1000;});



        chart
            .width(768)
            .height(480)
            .x(d3.scale.ordinal())
            .xUnits(units.ordinal)
            .brushOn(true)
            .yAxisLabel("This is the Y Axis!")
            .dimension(runDimension)
            .group(speedSumGroup)
            .controlsUseVisibility(true)
            .on('pretransition', function(chart) {
                chart.selectAll("rect.bar").on("click", function (d) {
                    console.log('click');
                    chart.filter(null)
                        .filter(d.data.key)
                        .redrawGroup();
                });
            });
        chart.render();
    });


}

  update(el, props) {

  }


  /** Any necessary cleanup */
  destroy(el) { }
}

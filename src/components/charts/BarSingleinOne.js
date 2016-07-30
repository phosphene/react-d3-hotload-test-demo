import * as d3 from 'd3';
//import {crossfilter} from 'crossfilter';
import {barChart, crossfilter, units} from 'dc';
import React, { PropTypes } from 'react';

class BarSingleinOne extends React.Component {


    render() {

        renderChart();

        return(   <div id="chart">
                  </div>
              );

    }



    renderChart ()  {

        var chart = barChart("#chart");

        d3.csv("./src/stores/morley.csv", function(error, experiments) {
            experiments.forEach(function(x) {
                x.Speed = +x.Speed;
            });
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

}

import * as d3 from 'd3';
import {crossfilter, units, geoChoroplethChart, bubbleChart, renderAll, redrawAll, filterAll, pieChart, barChart, dataCount, dataTable, pluck} from 'dc';
import * as dc from 'dc';
import * as colorbrewer from 'colorbrewer';
//we can call export at the top of the class declaration
export default class NasDashDC {

  constructor(el, props = {}) {
    //we initiate charts in constructor
    this.yearlyBubbleChart = dc.bubbleChart('#yearly-bubble-chart');
  }


  //and we call render here. this is not a react render. we could call it something else
  render() {

    let yearlyBubbleChart = this.yearlyBubbleChart

   d3.json('src/stores/ndx.json', function (data) {
      // Since its a csv file we need to format the data a bit.
      var dateFormat = d3.time.format('%m/%d/%Y');
      var numberFormat = d3.format('.2f');

      data.forEach(d => {
        d.dd = dateFormat.parse(d.date);
        d.month = d3.time.month(d.dd); // pre-calculate month for better performance
        d.close = +d.close; // coerce to number
        d.open = +d.open;
      });

      //### Create Crossfilter Dimensions and Groups

      //See the [crossfilter API](https://github.com/square/crossfilter/wiki/API-Reference) for reference.
      var ndx = crossfilter(data);

      // Dimension by year
      /*var yearlyDimension = ndx.dimension(function (d) {
        console.log(d.board.name);
        return d.board.name;
        //return d3.time.year(d.dd).getFullYear();
      });*/
      // Maintain running tallies by year as filters are applied or removed
      const stickDim = ndx.dimension(pluck("board", (x,i) => {
        console.log(x.name);
        return x.name;
      }));
      const stickGroup = stickDim.group().reduce(
        /* callback for when data is added to the current filter results */
        function (p, v) {
          //console.log(v);
          //p.absGain += v.close - v.open;
          p.funFactor += v.funFactor;
          console.log(v.funFactor);
          return p;
        },
        /* callback for when data is removed from the current filter results */
        function (p, v) {
          p.funFactor -= v.funFactor;
          //p.absGain -= v.close - v.open;
          return p;
        },
        /* initialize p */
        function () {
          return {
            //absGain: 0,
            funFactor:0
          };
        }
      );


     //### Define Chart Attributes
      // Define chart attributes using fluent methods. See the
      // [dc.js API Reference](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md) for more information
      //

      //#### Bubble Chart

      //Create a bubble chart and use the given css selector as anchor. You can also specify
      //an optional chart group for this chart to be scoped within. When a chart belongs
      //to a specific group then any interaction with the chart will only trigger redraws
      //on charts within the same chart group.
      // <br>API: [Bubble Chart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#bubble-chart)

      yearlyBubbleChart /* dc.bubbleChart('#yearly-bubble-chart', 'chartGroup') */
      // (_optional_) define chart width, `default = 200`
        .width(990)
      // (_optional_) define chart height, `default = 200`
        .height(250)
      // (_optional_) define chart transition duration, `default = 750`
        .transitionDuration(1500)
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .dimension(stickDim)
      //The bubble chart expects the groups are reduced to multiple values which are used
      //to generate x, y, and radius for each key (bubble) in the group
        .group(stickGroup)
      // (_optional_) define color function or array for bubbles: [ColorBrewer](http://colorbrewer2.org/)
        .colors(colorbrewer.RdYlGn[9])
      //(optional) define color domain to match your data domain if you want to bind data or color
        .colorDomain([-500, 500])
      //##### Accessors

      //Accessor functions are applied to each value returned by the grouping

      // `.colorAccessor` - the returned value will be passed to the `.colors()` scale to determine a fill color
        .colorAccessor(function (p) {
          return p.value.funFactor;
        })
      // `.keyAccessor` - the `X` value will be passed to the `.x()` scale to determine pixel location
        .keyAccessor(function (p) {
          return p.value.funFactor;
        })
      // `.valueAccessor` - the `Y` value will be passed to the `.y()` scale to determine pixel location
        .valueAccessor(function (p) {
          return p.value.funFactor;
        })
      // `.radiusValueAccessor` - the value will be passed to the `.r()` scale to determine radius size;
      //   by default this maps linearly to [0,100]
        .radiusValueAccessor(function (p) {
          return p.value.funFactor;
        })
        .maxBubbleRelativeSize(0.3)
        .x(d3.scale.linear().domain([-2500, 2500]))
        .y(d3.scale.linear().domain([-100, 100]))
        .r(d3.scale.linear().domain([0, 4000]))
      //##### Elastic Scaling

      //`.elasticY` and `.elasticX` determine whether the chart should rescale each axis to fit the data.
        .elasticY(true)
        .elasticX(true)
      //`.yAxisPadding` and `.xAxisPadding` add padding to data above and below their max values in the same unit
      //domains as the Accessors.
        .yAxisPadding(100)
        .xAxisPadding(500)
      // (_optional_) render horizontal grid lines, `default=false`
        .renderHorizontalGridLines(true)
      // (_optional_) render vertical grid lines, `default=false`
        .renderVerticalGridLines(true)
      // (_optional_) render an axis label below the x axis
        .xAxisLabel('Index Gain')
      // (_optional_) render a vertical axis lable left of the y axis
        .yAxisLabel('Index Gain %')
      //##### Labels and  Titles

      //Labels are displayed on the chart for each bubble. Titles displayed on mouseover.
      // (_optional_) whether chart should render labels, `default = true`
        .renderLabel(true)
        .label(function (p) {
          return p.key;
        })
      // (_optional_) whether chart should render titles, `default = false`
        .renderTitle(true)
        .title(function (p) {
          return [
            p.key,
            'Index Gain: ' + numberFormat(p.value.absGain),
            'Index Gain in Percentage: ' + numberFormat(p.value.percentageGain) + '%',
            'Fluctuation / Index Ratio: ' + numberFormat(p.value.fluctuationPercentage) + '%'
          ].join('\n');
        })
      //#### Customize Axes

      // Set a custom tick format. Both `.yAxis()` and `.xAxis()` return an axis object,
      // so any additional method chaining applies to the axis, not the chart.
        .yAxis().tickFormat(function (v) {
          return v + '%';
        });




      //#### Rendering

      //simply call `.renderAll()` to render all charts on the page
      dc.renderAll();
      /*
         // Or you can render charts belonging to a specific chart group
         dc.renderAll('group');
         // Once rendered you can call `.redrawAll()` to update charts incrementally when the data
         // changes, without re-rendering everything
         dc.redrawAll();
         // Or you can choose to redraw only those charts associated with a specific chart group
         dc.redrawAll('group');
       */

    });

  }


  resetChart(chartName) {

    switch (chartName) {
      case "yearly-bubble-chart":
        this.yearlyBubbleChart.filterAll();
        break;
      case "monthly-move-chart":
        this.moveChart.filterAll();
        this.volumeChart.filterAll();
        break;
      case "all":
        dc.filterAll();
        dc.renderAll();
        break;
      default:
        //Statements executed when none of the values match the value of the expression
        break;
    }

    dc.redrawAll();
  }


}

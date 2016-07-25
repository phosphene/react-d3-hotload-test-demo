import * as d3 from "d3";
import BaseChart from "./BaseChart";

export default class PlotTourChart extends BaseChart {



   const chart = {

       var chart = {};

       chart.render = function() {



           this.svg = d3.select(this.el).append("svg"),
           width = +svg.attr("width"),
           height = +svg.attr("height"),
           transform = d3.zoomIdentity;;

           const points = d3.range(2000).map(phyllotaxis(10));

           this.g = svg.append("g");

           this.g.selectAll("circle")
               .data(points)
               .enter().append("circle")
               .attr("cx", function(d) { return d.x; })
               .attr("cy", function(d) { return d.y; })
               .attr("r", 2.5)
               .call(d3.drag()
                     .on("drag", dragged));

       };

       return chart;
   }



    function zoomed() {
        this.g.attr("transform", d3.event.transform);
    }

    function dragged(d) {
        d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    }

    function phyllotaxis(radius) {
        var theta = Math.PI * (3 - Math.sqrt(5));
        return function(i) {
            var r = radius * Math.sqrt(i), a = theta * i;
            return {
                x: width / 2 + r * Math.cos(a),
                y: height / 2 + r * Math.sin(a)
            };
        };
    }


    create(data) {
    }

    update(data) {


        this.svg.call(d3.zoom()
                      .scaleExtent([1 / 2, 8])
                      .on("zoom", zoomed()));


    }
}

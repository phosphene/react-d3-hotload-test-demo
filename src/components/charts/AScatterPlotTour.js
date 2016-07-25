import * as d3 from "d3";
import React from "react";


export default class AScatterPlotTour {
    constructor(el, props) {
        this.el = el;
        this.props = props;
    }


    getColor() {
        return d3.scaleOrdinal(d3.schemeCategory20b);
    }






    create(data) {


        this.context = d3.select(this.el).append("canvas").node().getContext("2d"),
        this.svg = d3.select("canvas").append("svg"),
        this.width = +this.svg.attr("width"),
        this.height = +this.svg.attr("height");


        const k = this.height / this.width,
        x = d3.scaleLinear().domain([-4.5, 4.5]).range([0, this.width]),
        y = d3.scaleLinear().domain([-4.5 * k, 4.5 * k]).range([this.height, 0]),
        z = d3.schemeCategory10;

        const xAxis = d3.axisTop(x).ticks(12);
        const yAxis = d3.axisRight(y).ticks(12 * this.height / this.width);

        const zoom = d3.zoom()
            .on("zoom", myZoomed());

        const gx = svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (this.height - 10) + ")")
            .call(xAxis);

        const gy = svg.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(10,0)")
            .call(yAxis);


        this.svg.selectAll(".domain")
            .style("display", "none");

        this.svg.call(zoom.transform, d3.zoomIdentity);

        d3.interval(function() {
            var pointset = pointsets[i = (i + 1) % (pointsets.length + 1)] || points,
            x0 = x(d3.min(pointset, function(d) { return d[0]; })),
            x1 = x(d3.max(pointset, function(d) { return d[0]; })),
            y0 = y(d3.max(pointset, function(d) { return d[1]; })),
            y1 = y(d3.min(pointset, function(d) { return d[1]; })),
            k = 0.9 / Math.max((x1 - x0) / this.width, (y1 - y0) / this.height),
            tx = (this.width - k * (x0 + x1)) / 2,
            ty = (this.height - k * (y0 + y1)) / 2;

            this.svg.transition()
                .duration(1500)
                .call(zoom.transform, d3.zoomIdentity
                      .translate(tx, ty)
                      .scale(k));
        }, 2500);


        function myZoomed() {

            zx = d3.event.transform.rescaleX(x);
            zy = d3.event.transform.rescaleY(y);

            gx.call(xAxis.scale(zx));
            gy.call(yAxis.scale(zy));

            context.clearRect(0, 0, width, height);
            for (var j = 0, m = pointsets.length; j < m; ++j) {
                this.context.beginPath();
                this.context.fillStyle = d3.schemeCategory10[j];
                for (var points = pointsets[j], i = 0, n = points.length, p, px, py; i < n; ++i) {
                    p = points[i], px = zx(p[0]), py = zy(p[1]);
                    context.moveTo(px + 2.5, py);
                    context.arc(px, py, 2.5, 0, 2 * Math.PI);
                }
                this.context.fill();
            }
        }









    }




    update() {
        // not yet
    }

    unmount() {
        this.el.remove();
    }

}

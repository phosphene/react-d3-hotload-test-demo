import * as d3 from 'd3';
import {crossfilter, units, geoChoroplethChart, bubbleChart, renderAll, redrawAll, filterAll, pieChart, barChart, dataCount, dataTable, pluck} from 'dc';

//we can call export at the top of the class declaration
export default class BeerDashDC {

    constructor(el, props = {}) {
        console.log(props)
        //we initiate charts in constructor

        this.numberFormat = d3.format(".2f");

    }


    //and we call render here. this is not a react render. we could call it something else
    render() {

                /* Parse JSON file, create charts, draw markers on map */
                d3.json('src/stores/untappd.json', function (error, data) {
                  var beerData = data.response.beers.items;

                  var fullDateFormat = d3.time.format('%a, %d %b %Y %X %Z');
                  var yearFormat = d3.time.format('%Y');
                  var monthFormat = d3.time.format('%b');
                  var dayOfWeekFormat = d3.time.format('%a');

                  // normalize/parse data so dc can correctly sort & bin them
                  // I like to think of each "d" as a row in a spreadsheet
                  beerData.forEach(d => {
                    d.count = +d.count;
                    // round to nearest 0.25
                    d.rating_score = Math.round(+d.rating_score * 4) / 4;
                    d.beer.rating_score = Math.round(+d.beer.rating_score *4) / 4;
                    // round to nearest 0.5
                    d.beer.beer_abv = Math.round(+d.beer.beer_abv * 2) / 2;
                    // round to nearest 10
                    d.beer.beer_ibu = Math.floor(+d.beer.beer_ibu / 10) * 10;

                    d.first_had_dt = fullDateFormat.parse(d.first_had);
                    d.first_had_year = +yearFormat(d.first_had_dt);
                    d.first_had_month = monthFormat(d.first_had_dt);
                    d.first_had_day = dayOfWeekFormat(d.first_had_dt);
                  });

                  // set crossfilter
                  var ndx = crossfilter(beerData);

                  // create dimensions (x-axis values)
                  var yearDim  = ndx.dimension(function(d) {return d.first_had_year;}),
                      // pluck: short-hand for same kind of anon. function we used for yearDim
                      monthDim  = ndx.dimension(pluck('first_had_month')),
                      dayOfWeekDim = ndx.dimension(pluck('first_had_day')),
                      ratingDim = ndx.dimension(pluck('rating_score')),
                      commRatingDim = ndx.dimension(function(d) {return d.beer.rating_score;}),
                      abvDim = ndx.dimension(function(d) {return d.beer.beer_abv;}),
                      ibuDim = ndx.dimension(function(d) {return d.beer.beer_ibu;}),
                      allDim = ndx.dimension(function(d) {return d;});

                  // create groups (y-axis values)
                  var all = ndx.groupAll();
                  var countPerYear = yearDim.group().reduceCount(),
                      countPerMonth = monthDim.group().reduceCount(),
                      countPerDay = dayOfWeekDim.group().reduceCount(),
                      countPerRating = ratingDim.group().reduceCount(),
                      countPerCommRating = commRatingDim.group().reduceCount(),
                      countPerABV = abvDim.group().reduceCount(),
                      countPerIBU = ibuDim.group().reduceCount();

                  // specify charts
                  var yearChart   = pieChart('#chart-ring-year'),
                      monthChart   = pieChart('#chart-ring-month'),
                      dayChart   = pieChart('#chart-ring-day'),
                      ratingCountChart  = barChart('#chart-rating-count'),
                      commRatingCountChart  = barChart('#chart-community-rating-count'),
                      abvCountChart  = barChart('#chart-abv-count'),
                      ibuCountChart  = barChart('#chart-ibu-count');
                    var  myDataCount = dataCount('#data-count');
                    var  myDataTable = dataTable('#data-table');

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
                          'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4,
                          'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8,
                          'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
                        };
                        return order[d.key];
                      });

                  dayChart
                      .width(150)
                      .height(150)
                      .dimension(dayOfWeekDim)
                      .group(countPerDay)
                      .innerRadius(20)
                      .ordering(function (d) {
                        var order = {
                          'Mon': 0, 'Tue': 1, 'Wed': 2, 'Thu': 3,
                          'Fri': 4, 'Sat': 5, 'Sun': 6
                        }
                        return order[d.key];
                      }
                     );

                  ratingCountChart
                      .width(300)
                      .height(180)
                      .dimension(ratingDim)
                      .group(countPerRating)
                      .x(d3.scale.linear().domain([0,5.2]))
                      .elasticY(true)
                      .centerBar(true)
                      .barPadding(5)
                      .xAxisLabel('My rating')
                      .yAxisLabel('Count')
                      .margins({top: 10, right: 20, bottom: 50, left: 50});
                  ratingCountChart.xAxis().tickValues([0, 1, 2, 3, 4, 5]);

                  commRatingCountChart
                      .width(300)
                      .height(180)
                      .dimension(commRatingDim)
                      .group(countPerCommRating)
                      .x(d3.scale.linear().domain([0,5.2]))
                      .elasticY(true)
                      .centerBar(true)
                      .barPadding(5)
                      .xAxisLabel('Community rating')
                      .yAxisLabel('Count')
                      .margins({top: 10, right: 20, bottom: 50, left: 50});
                  commRatingCountChart.xAxis().tickValues([0, 1, 2, 3, 4, 5]);

                  abvCountChart
                      .width(300)
                      .height(180)
                      .dimension(abvDim)
                      .group(countPerABV)
                      .x(d3.scale.linear().domain([-0.2, d3.max(beerData, function (d) { return d.beer.beer_abv; }) + 0.2]))
                      .elasticY(true)
                      .centerBar(true)
                      .barPadding(2)
                      .xAxisLabel('Alcohol By Volume (%)')
                      .yAxisLabel('Count')
                      .margins({top: 10, right: 20, bottom: 50, left: 50});

                  ibuCountChart
                      .width(300)
                      .height(180)
                      .dimension(ibuDim)
                      .group(countPerIBU)
                      .x(d3.scale.linear().domain([-2, d3.max(beerData, function (d) { return d.beer.beer_ibu; }) + 2]))
                      .elasticY(true)
                      .centerBar(true)
                      .barPadding(5)
                      .xAxisLabel('International Bitterness Units')
                      .yAxisLabel('Count')
                      .xUnits(function (d) { return 5;})
                      .margins({top: 10, right: 20, bottom: 50, left: 50});

                  myDataCount
                      .dimension(ndx)
                      .group(all);

                   myDataTable
                    .dimension(allDim)
                    .group(function (d) { return 'dc.js insists on putting a row here so I remove it using JS'; })
                    .size(100)
                    .columns([
                      function (d) { return d.brewery.brewery_name; },
                      function (d) { return d.beer.beer_name; },
                      function (d) { return d.beer.beer_style; },
                      function (d) { return d.rating_score; },
                      function (d) { return d.beer.rating_score; },
                      function (d) { return d.beer.beer_abv; },
                      function (d) { return d.beer.beer_ibu; }
                    ])
                    .sortBy(pluck('rating_score'))
                    .order(d3.descending)
                    .on('renderlet', function (table) {
                      // each time table is rendered remove nasty extra row dc.js insists on adding
                      table.select('tr.dc-table-group').remove();
                    });

                  // register handlers
                  d3.selectAll('a#all').on('click', function () {
                    filterAll();
                    renderAll();
                  });

                  d3.selectAll('a#year').on('click', function () {
                    yearChart.filterAll();
                    redrawAll();
                  });

                  d3.selectAll('a#month').on('click', function () {
                    monthChart.filterAll();
                    redrawAll();
                  });

                  d3.selectAll('a#day').on('click', function () {
                    dayChart.filterAll();
                    redrawAll();
                  });

                  // showtime!
                  renderAll();

                });
                }

        }

import * as d3 from 'd3';

import  { observable, computed } from 'mobx';

export default class Store {
    //Autorun is a function from MobX that runs everytime that something inside is
   // name = "blah";
   // @observable numClicks = 0;

    //  @computed get oddOrEven() {
    //      return this.numClicks % 2 === 0 ? 'even' : 'odd'
    //  }

    //    var data = d3.csvParse(string);
    //psv = d3.dsvFormat("|");

//    muumble = psv.parse("foo|bar\n1|2");

    @observable experiments =  d3.csv.parse("morley.csv", function(error, experiments) {
        experiments.forEach(function(x) {
            x.Speed = +x.Speed;
        });
    });

                                          // ndx = crossfilter(experiments);
}

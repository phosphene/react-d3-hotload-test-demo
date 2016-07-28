import * as d3 from 'd3';

import  { observable, computed } from 'mobx';

export default class AppState {
    //Autorun is a function from MobX that runs everytime that something inside is
   // name = "blah";
   @observable numClicks = 2;

    @computed get oddOrEven() {
         return this.numClicks % 2 === 0 ? 'even' : 'odd'
    }


   @computed  get mumble() {

   return 'string';
  }

    @observable myString = 'blah';

    @observable experiments =    d3.csv("morley.csv", function(error, experiments) {
          experiments.forEach(function(x) {
              x.Speed = +x.Speed;
             //console.log(x.Speed);
          });

      });

 }

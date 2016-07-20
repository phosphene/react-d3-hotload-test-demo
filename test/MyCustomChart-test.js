import React from 'react';
import { render } from "react-dom";
//import {setFixtures} from "jasmine-jquery";
import $ from 'jquery';
import jQuery from 'jquery';

import { shallow, mount} from 'enzyme';
import MyCustomChartWrapper from '../src/components/wraps/MyCustomChartWrapper';
import ASpecificChart from '../src/components/charts/ASpecificChart';

import jasmineEnzyme from 'jasmine-enzyme';
import jasmime_dom_matchers from 'jasmine_dom_matchers';

describe("draw", function() {

        beforeEach(() => {
            jasmineEnzyme();
        });

    const wrapper = mount(<MyCustomChartWrapper/>);



    it("should render chart element", function() {
        expect(wrapper.find('div')).toBePresent();
    });


    it("should render Chart element", function() {
        //expect(wrapper.find('Chart')).toBePresent();
        const chart = wrapper.find('.chart');
        //console.log(wrapper.find('.chart'));
        //console.log(chart.get(1).debug());
        //console.log(chart.find('svg'));

        //expect(wrapper.find('g')).toBePresent();
        const myNode = chart.node;
        console.log(myNode);
//        var createFragment = require('react-addons-create-fragment');
  //      var frag = createFragment(myNode);
        var ReactTestUtils = require('react-addons-test-utils');

        //var root = React.createElement('div', { className: 'my-chart' }, frag);
        require('jasmine_dom_matchers');

        expect(myNode).toHaveClass("chart");
        expect(myNode).toExist('svg');



        // var Fixture = React.createClass({
        //     render: function() {
        //         return (
        //                 <div>
        //                 {frag}
        //             </div>
        //         );
        //     }
        // });

        // const wrap =  mount(<Fixture/>);
        // //console.log(wrap);


    });


});

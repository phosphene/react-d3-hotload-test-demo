import React from 'react';
import { findDOMNode } from "react-dom";
import { shallow, mount, render } from 'enzyme';
import ASpecificChart from '../src/components/charts/ASpecificChart';
import jasmineEnzyme from 'jasmine-enzyme';

xdescribe("draw", function() {

        beforeEach(() => {
            jasmineEnzyme();
        });



    const wrapper = mount(<ASpecificChart/>);


    it("should render Chart element", function() {
        expect(wrapper.find('Chart')).toBePresent();
        //console.log(wrapper.debug());
    });


});

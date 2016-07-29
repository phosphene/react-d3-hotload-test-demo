import React from 'react';
import { shallow, mount, render } from 'enzyme';
import MyChart from '../src/components/wraps/MyChart';
import jasmineEnzyme from 'jasmine-enzyme';

xdescribe("draw", function() {

        beforeEach(() => {
            jasmineEnzyme();
        });

    const wrapper = mount(<MyChart/>);

    it("should render chart element", function() {
        expect(wrapper.find('.chart')).toBePresent();
    });



    it("should render Chart element", function() {
        expect(wrapper.find('Chart')).toBePresent();
        //console.log(wrapper.debug());
    });



});

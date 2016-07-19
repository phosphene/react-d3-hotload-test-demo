import React from 'react';
import { shallow, mount, render } from 'enzyme';
import MyChart from '../src/components/MyChart';
import jasmineEnzyme from 'jasmine-enzyme';

describe("draw", function() {

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

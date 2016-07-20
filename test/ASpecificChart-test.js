import React from 'react';
import { shallow, mount, render } from 'enzyme';
import MyCustomChartWrapper from '../src/components/wraps/MyCustomChartWrapper';
import jasmineEnzyme from 'jasmine-enzyme';

describe("draw", function() {

        beforeEach(() => {
            jasmineEnzyme();
        });

    const wrapper = shallow(<MyCustomChartWrapper/>);


    it("should render Chart element", function() {
        expect(wrapper.find('Chart')).toBePresent();
        console.log(wrapper.debug());
    });


});

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Counter from '../src/components/Counter';

describe("A suite", function() {
//basic spec that proves that specs work!

  it("contains spec with an expectation", function() {
      expect(shallow(<Counter store={this.props.appState}/>).find('h2').length).toBe(1);
  });

  it("can run an expectation with render", function() {
      expect(render(<Counter store={this.props.appState}/>).find('h2').length).toBe(1);
  });
});

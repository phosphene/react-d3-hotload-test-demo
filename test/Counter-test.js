import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Counter from '../src/Counter';

describe("A suite", function() {
  // it("contains spec with an expectation", function() {
  //   expect(shallow(<Counter />).contains(<h2>)).toBe(true);
  // });

  // it("contains spec with an expectation", function() {
  //   expect(shallow(<Counter />).is('')).toBe(true);
  // });

  it("contains spec with an expectation", function() {
    expect(shallow(<Counter />).find('h2').length).toBe(1);
  });

  it("can run an expectation with render", function() {
    expect(render(<Counter />).find('h2').length).toBe(1);
  });
});
